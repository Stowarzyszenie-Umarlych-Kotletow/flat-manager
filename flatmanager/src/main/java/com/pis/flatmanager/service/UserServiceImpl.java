package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UserDto;
import com.pis.flatmanager.dto.VerifyUserDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityDuplicateException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.model.UserFlat;
import com.pis.flatmanager.repository.UserRepository;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(){

    }

    @Override
    public User createUser(CreateUserDto userDto) throws EntityDuplicateException {
        var userToBeChecked = userRepository.findByUsername(userDto.getUsername());
        if(userToBeChecked.isPresent()) {
            throw new EntityDuplicateException(String.format("User %s already exists", userDto.getUsername()));
        }
        User user = new User(userDto.getFirstName(), userDto.getLastName(), userDto.getUsername(), userDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        return user;
    }

    @Override
    public boolean verifyUser(VerifyUserDto userDto) throws EntityNotFoundException {
        var userToBeVerified = userRepository.findByUsername(userDto.getUsername());
        if(userToBeVerified.isEmpty()) {
            throw new EntityNotFoundException(String.format("User %s does not exist", userDto.getUsername()));
        }
        return passwordEncoder.matches(userDto.getPassword(), userToBeVerified.get().getPasswordHash());
    }

    @Override
    public User updateUserPassword(User user, String newPassword) {
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return user;
    }

    @Override
    public User updateUserEmail(User user, String newEmail) {
        user.setEmail(newEmail);
        userRepository.save(user);
        return user;
    }

    @Override
    public User addUserFlat(User user, UserFlat flat) {
        if(user.getFlats().contains(flat)) {
            throw new EntityDuplicateException("User is already a member of this flat");
        }
        user.getFlats().add(flat);
        userRepository.save(user);
        return user;
    }

    @Override
    public User removeUserFlat(User user, UUID flatId) {
        if (!user.getFlats().removeIf(flat -> flat.getId().equals(flatId))) {
            throw new EntityNotFoundException("Cannot find flat with this id");
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public User updateUserFlat(User user, UserFlat flat) {
        if (user.getFlats().stream().noneMatch(f -> f.getId().equals(flat.getId()))) {
            throw new EntityNotFoundException("This flat does not exist");
        }
        user.getFlats().forEach(f -> {
            if (f.getId().equals(flat.getId())) {
                f.setName(flat.getName());
            }
        });
        userRepository.save(user);
        return user;
    }

    @Override
    public void deleteUser(UUID userId) throws EntityNotFoundException {
        var user = userRepository.findById(userId);
        if(user.isEmpty()) {
            throw new EntityNotFoundException(String.format("User %s does not exist", userId));
        }
        userRepository.deleteById(userId);
    }

    @Override
    public Collection<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(UUID id) throws EntityNotFoundException {
        var user = userRepository.findById(id);
        if(user.isEmpty()) {
            throw new EntityNotFoundException(String.format("User %s does not exist", id));
        }
        return user.get();
    }

    @Override
    public User getUserByUsername(String username) throws EntityNotFoundException {
        var user = userRepository.findByUsername(username);
        if(user.isEmpty()) {
            throw new EntityNotFoundException(String.format("User %s does not exist", username));
        }
        return user.get();
    }

    @Override
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    @Override
    public UserDto userToDto(User user) {
        return UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .id(user.getId().toString())
                .flats(user.getFlats())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getUserByUsername(username).getDetails();
    }

    @Override
    public User getCurrentUser() throws EntityNotFoundException, AccessForbiddenException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.isAuthenticated()) {
            throw new AccessForbiddenException("NO_USER");
        }
        var username = authentication.getName();
        return this.getUserByUsername(username);
    }

}
