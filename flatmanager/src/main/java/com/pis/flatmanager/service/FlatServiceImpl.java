package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.flats.AddUserFlatDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.dto.flats.FlatDto;
import com.pis.flatmanager.dto.flats.UpdateNameFlatDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityDuplicateException;
import com.pis.flatmanager.exception.EntityNotFoundException;
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

        var flatOwner = new FlatUser(owner.getId(), owner.getUsername(), FlatRole.OWNER);
        Flat flat = new Flat(flatDto.getName(), flatOwner);

        flat.getUsers().put(flatOwner.getId(), flatOwner);
        userService.addUserFlat(owner, new UserFlat(
                flat.getId(),
                flat.getName()
        ));
        flatRepository.save(flat);
        return flat;
    }

    @Override
    public void deleteFlat(User user, UUID id) throws EntityNotFoundException, AccessForbiddenException {
        var flat = getFlat(id);

        if(!flat.getOwner().getId().equals(user.getId())) {
            throw new AccessForbiddenException("This user is not an owner");
        }
        flat.getUsers().forEach((k, v) -> {
            User flatUser = userService.getUser(k);
            userService.removeUserFlat(flatUser, flat.getId());
        });

        flatRepository.deleteById(id);
    }

    @Override
    public Flat updateFlatName(User user, UUID flatId, UpdateNameFlatDto dto) throws EntityNotFoundException, EntityDuplicateException, AccessForbiddenException {
        Optional<Flat> flat = flatRepository.findById(flatId);
        if (flat.isEmpty())
            throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));

        if(flatRepository.findByName(dto.getName()).isPresent()) {
            throw new EntityDuplicateException(String.format("Flat %s already exists", dto.getName()));
        }

        if(!flat.get().getOwner().getId().equals(user.getId())) {
            throw new AccessForbiddenException("This user does not have access to rename this flat");
        }

        flat.get().getUsers().forEach((k,v) -> {
            User flatUser = userService.getUser(k);
            userService.updateUserFlat(flatUser, new UserFlat(
                    flat.get().getId(),
                    flat.get().getName()
            ));
        });

        flat.get().setName(dto.getName());
        flatRepository.save(flat.get());
        return flat.get();
    }

    @Override
    public Flat updateFlat(Flat flat) {
        return flatRepository.save(flat);
    }

    @Override
    public Flat getFlat(UUID id) {
        return flatRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Flat %s does not exist", id)));
    }

    @Override
    public Flat getFlatAsUser(User user, UUID flatId)
            throws EntityNotFoundException, AccessForbiddenException {
        var flat = getFlat(flatId);

        if(!flat.getUsers().containsKey(user.getId())) {
            throw new AccessForbiddenException("This user does not have access to view this flat");
        }

        return flat;
    }

    @Override
    public List<FlatTask> getFlatTasks(UUID flatId) {
        var flat = flatRepository.findById(flatId).orElseThrow();
        return new ArrayList<>(flat.getTasks().values());
    }


    @Override
    public Flat addUserToFlat(User user, UUID flatId, AddUserFlatDto dto) throws EntityNotFoundException, AccessForbiddenException {

        Optional<Flat> flat = flatRepository.findById(flatId);
        if (flat.isEmpty()) throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));

        User addUser = userService.getUser(dto.getUserId());

        if(!flat.get().getOwner().getId().equals(user.getId()) || !dto.getRole().equals(FlatRole.USER)) {
            throw new AccessForbiddenException("This user cannot be the owner");
        }

        var flatUsers = getUsersFromFlat(flatId);

        if(flatUsers.containsKey(dto.getUserId())) {
            throw new EntityDuplicateException("This user is already assigned to this flat");
        }

        var flatUser = new FlatUser(
                addUser.getId(),
                addUser.getUsername(),
                dto.getRole()
        );

        flat.get().getUsers().put(addUser.getId(), flatUser);

        userService.addUserFlat(addUser, new UserFlat(
                flatId, flat.get().getName()
        ));
        flatRepository.save(flat.get());
        return flat.get();
    }

    @Override
    public Flat removeUserFromFlat(User user, UUID flatId, UUID userId)
            throws EntityNotFoundException, AccessForbiddenException {
        Optional<Flat> flat = flatRepository.findById(flatId);
        if (flat.isEmpty())
            throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));

        var delUser = userService.getUser(userId);

        var flatUsers = getUsersFromFlat(flatId);
        if(!flatUsers.containsKey(delUser.getId())) {
            throw new EntityNotFoundException("User does not exist in this flat");
        }

        if(flat.get().getOwner().getId().equals(user.getId())) {
            flat.get().getUsers().remove(userId);
        } else {
            if(flatUsers.get(user.getId()).getId().equals(userId)) {
                flat.get().getUsers().remove(userId);
            } else {
                throw new AccessForbiddenException("This user cannot delete other users from this flat");
            }
        }

        userService.removeUserFlat(delUser, flatId);
        flatRepository.save(flat.get());
        return flat.get();

    }

    @Override
    public FlatDto flatToDto(Flat flat) {
        return FlatDto.builder()
                .id(flat.getId())
                .name(flat.getName())
                .users(new ArrayList<>(flat.getUsers().values()))
                .build();
    }

    @Override
    public Map<UUID, FlatUser> getUsersFromFlat(UUID flatId) {
        Optional<Flat> flat = flatRepository.findById(flatId);
        if(flat.isEmpty()) {
            throw new EntityNotFoundException(String.format("Flat %s does not exist", flatId));
        }
        return flat.get().getUsers();
    }

}
