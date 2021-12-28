package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.*;
import com.pis.flatmanager.exception.UserDuplicateException;
import com.pis.flatmanager.exception.UserNotFoundException;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.UserRepository;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(){

    }

    @Override
    public User createUser(CreateUserDto userDto) throws UserDuplicateException {
        var userToBeChecked = userRepository.findByUsername(userDto.getUsername());
        if(userToBeChecked.isPresent()) {
            throw new UserDuplicateException(String.format("User %s already exists", userDto.getUsername()));
        }
        User user = new User(userDto.getFirstName(), userDto.getLastName(), userDto.getUsername(), userDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        return user;
    }

    @Override
    public boolean verifyUser(VerifyUserDto userDto) throws UserNotFoundException {
        var userToBeVerified = userRepository.findByUsername(userDto.getUsername());
        if(userToBeVerified.isEmpty()) {
            throw new UserNotFoundException(String.format("User %s does not exist", userDto.getUsername()));
        }
        return passwordEncoder.matches(userDto.getPassword(), userToBeVerified.get().getPasswordHash());
    }

    @Override
    public User updateUserPassword(UpdatePasswordUserDto userDto) throws UserNotFoundException {
        var user = userRepository.findById(UUID.fromString(userDto.getId()));
        if(user.isEmpty()) {
            throw new UserNotFoundException(String.format("User %s does not exist", userDto.getId()));
        }
        user.get().setPasswordHash(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user.get());
        return user.get();
    }

    @Override
    public User updateUserEmail(UpdateEmailUserDto userDto) throws UserNotFoundException {
        var user = userRepository.findById(UUID.fromString(userDto.getId()));
        if(user.isEmpty()) {
            throw new UserNotFoundException(String.format("User %s does not exist", userDto.getId()));
        }
        user.get().setEmail(userDto.getEmail());
        userRepository.save(user.get());
        return user.get();
    }

    @Override
    public void deleteUser(String userId) throws UserNotFoundException {
        var user = userRepository.findById(UUID.fromString(userId));
        if(user.isEmpty()) {
            throw new UserNotFoundException(String.format("User %s does not exist", userId));
        }
        userRepository.deleteById(UUID.fromString(userId));
    }

    @Override
    public Collection<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String id) throws UserNotFoundException {
        var user = userRepository.findById(UUID.fromString(id));
        if(user.isEmpty()) {
            throw new UserNotFoundException(String.format("User %s does not exist", id));
        }
        return user.get();
    }

    @Override
    public User getUserByUsername(String username) throws UserNotFoundException {
        var user = userRepository.findByUsername(username);
        if(user.isEmpty()) {
            throw new UserNotFoundException(String.format("User %s does not exist", username));
        }
        return user.get();
    }

    @Override
    public UserDto userToDto(User user) {
        return UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .id(user.getId().toString())
                .build();
    }
}
