package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.flats.*;
import com.pis.flatmanager.exception.*;
import com.pis.flatmanager.model.*;
import com.pis.flatmanager.repository.FlatRepository;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@NoArgsConstructor
public class FlatServiceImpl implements FlatService {
    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private UserService userService;

    @Override
    public Flat createFlat(User owner, CreateFlatDto flatDto) throws EntityDuplicateException {
        if (flatRepository.findByName(flatDto.getName()).isPresent())
            throw new EntityDuplicateException(String.format("Flat %s already exists", flatDto.getName()));

        Flat flat = new Flat(flatDto.getName(), new FlatUser(owner.getId(), owner.getUsername(), FlatRole.OWNER));

        flatRepository.save(flat);
        return flat;
    }

    @Override
    public void deleteFlat(User user, String id) throws EntityNotFoundException, AccessForbiddenException {
        Optional<Flat> flat = flatRepository.findById(UUID.fromString(id));
        if (flat.isEmpty()) throw new EntityNotFoundException(String.format("Flat %s does not exist", id));

        if(!flat.get().getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("This user is not an owner");
        }

        flatRepository.deleteById(UUID.fromString(id));
    }

    @Override
    public Flat updateFlatName(User user, String flatId, UpdateNameFlatDto dto) throws EntityNotFoundException, EntityDuplicateException, AccessForbiddenException {
        Optional<Flat> flat = flatRepository.findById(UUID.fromString(flatId));
        if (flat.isEmpty())
            throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));

        if(flatRepository.findByName(dto.getName()).isPresent()) {
            throw new EntityDuplicateException(String.format("Flat %s already exists", dto.getName()));
        }

        if(!flat.get().getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("This user does not have access to rename this flat");
        }

        flat.get().setName(dto.getName());
        flatRepository.save(flat.get());
        return flat.get();
    }

    @Override
    public Flat getFlatInfo(User user, String id)
            throws EntityNotFoundException, AccessForbiddenException {
        Optional<Flat> flat = flatRepository.findById(UUID.fromString(id));
        if (flat.isEmpty())
            throw new EntityNotFoundException(String.format("Flat %s does not exist", id));

        if(!flat.get().getOwner().getUserId().equals(user.getId()) && !flat.get().getUsers().containsKey(user.getId())) {
            throw new AccessForbiddenException("This user does not have access to view this flat");
        }

        return flat.get();
    }

    @Override
    public List<Task> getTasksFromFlat() {
        return Collections.emptyList();
    }


    @Override
    public Flat addUserToFlat(User user, String flatId, AddUserFlatDto dto) throws EntityNotFoundException, AccessForbiddenException {

        Optional<Flat> flat = flatRepository.findById(UUID.fromString(flatId));
        if (flat.isEmpty()) throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));

        User addUser = userService.getUser(dto.getUserId());

        if(!flat.get().getOwner().getUserId().equals(user.getId()) || !dto.getRole().equals("USER")) {
            throw new AccessForbiddenException("This user cannot be the owner");
        }

        var flatUsers = getUsersFromFlat(flatId);

        if(flatUsers.containsKey(UUID.fromString(dto.getUserId()))) {
            throw new EntityDuplicateException("This user is already assigned to this flat");
        }

        var flatUser = new FlatUser(
                addUser.getId(),
                addUser.getUsername(),
                FlatRole.valueOf(dto.getRole())
        );

        flat.get().getUsers().put(addUser.getId(), flatUser);
        flatRepository.save(flat.get());
        return flat.get();
    }

    @Override
    public Flat removeUserFromFlat(User user, String flatId, RemoveUserFlatDto dto)
            throws EntityNotFoundException, AccessForbiddenException {
        Optional<Flat> flat = flatRepository.findById(UUID.fromString(flatId));
        if (flat.isEmpty())
            throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));

        var delUser = userService.getUser(dto.getUserId());

        var flatUsers = getUsersFromFlat(flatId);
        if(!flatUsers.containsKey(delUser.getId())) {
            throw new EntityNotFoundException("User does not exist in this flat");
        }

        if(flat.get().getOwner().getUserId().equals(user.getId())) {
            flat.get().getUsers().remove(UUID.fromString(dto.getUserId()));
        } else {
            if(flatUsers.get(user.getId()).getUserId().equals(UUID.fromString(dto.getUserId()))) {
                flat.get().getUsers().remove(UUID.fromString(dto.getUserId()));
            } else {
                throw new AccessForbiddenException("This user cannot delete other users from this flat");
            }
        }
        flatRepository.save(flat.get());
        return flat.get();

    }

    @Override
    public FlatDto flatToDto(Flat flat) {
        return FlatDto.builder()
                .id(flat.getId().toString())
                .name(flat.getName())
                .users(new ArrayList<>(flat.getUsers().values()))
                .build();
    }

    @Override
    public Map<UUID, FlatUser> getUsersFromFlat(String flatId) {
        Optional<Flat> flat = flatRepository.findById(UUID.fromString(flatId));
        if(flat.isEmpty()) {
            throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));
        }
        return flat.get().getUsers();
    }

}
