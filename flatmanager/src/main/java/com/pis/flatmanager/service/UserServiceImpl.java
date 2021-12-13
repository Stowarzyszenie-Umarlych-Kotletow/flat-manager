package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.*;
import com.pis.flatmanager.exception.UserServiceException;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.UserRepository;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import javax.validation.Validator;
import java.util.Collection;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(){

    }

    @Override
    public User createUser(CreateUserDto userDto) throws ValidationException, UserServiceException {
        var userToBeChecked = userRepository.findByUsername(userDto.username);
        if(userToBeChecked.isPresent()) {
            throw new UserServiceException(String.format("User {} already exists", userDto.username));
        }
        User user = new User(userDto.firstName, userDto.lastName, userDto.username, userDto.email);
        user.setPasswordHash(passwordEncoder.encode(userDto.password));
        var violations = validator.validate(user);
        if(!violations.isEmpty()) {
            throw new ValidationException("Validation failed");
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public boolean verifyUser(VerifyUserDto userDto) throws UserServiceException {
        var userToBeVerified = userRepository.findByUsername(userDto.username);
        if(userToBeVerified.isEmpty()) {
            throw new UserServiceException(String.format("User {} does not exist", userDto.username));
        }
        return passwordEncoder.matches(userDto.password, userToBeVerified.get().getPasswordHash());
    }

    @Override
    public User updateUserPassword(UpdatePasswordUserDto userDto) throws ValidationException, UserServiceException {
        var user = userRepository.findById(UUID.fromString(userDto.id));
        if(user.isEmpty()) {
            throw new UserServiceException(String.format("User {} does not exist", userDto.id));
        }
        user.get().setPasswordHash(passwordEncoder.encode(userDto.password));
        userRepository.save(user.get());
        return user.get();
    }

    @Override
    public User updateUserEmail(UpdateEmailUserDto userDto) throws ValidationException, UserServiceException {
        var user = userRepository.findById(UUID.fromString(userDto.id));
        if(user.isEmpty()) {
            throw new UserServiceException(String.format("User {} does not exist", userDto.id));
        }
        user.get().setEmail(userDto.email);
        var violations = validator.validate(user);
        if(!violations.isEmpty()) {
            throw new ValidationException("Validation failed");
        }
        userRepository.save(user.get());
        return user.get();
    }

    @Override
    public void deleteUser(String userId) throws UserServiceException {
        var user = userRepository.findById(UUID.fromString(userId));
        if(user.isEmpty()) {
            throw new UserServiceException(String.format("User {} does not exist", userId));
        }
        userRepository.deleteById(UUID.fromString(userId));
    }

    @Override
    public Collection<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String id) throws UserServiceException {
        var user = userRepository.findById(UUID.fromString(id));
        if(user.isEmpty()) {
            throw new UserServiceException(String.format("User {} does not exist", id));
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
