package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.UserDto;
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
import java.util.stream.Collectors;

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
    public User createUser(CreateUserDto userDto) throws ValidationException {
        User user = new User(userDto.firstName, userDto.lastName, userDto.nickname, userDto.email);
        user.setPasswordHash(passwordEncoder.encode(userDto.password));
        var violations = validator.validate(user);
        if(!violations.isEmpty()) {
            throw new ValidationException("Validation failed");
        }
        userRepository.save(user);
        return user;
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
    public User deleteUser(String userId) throws UserServiceException {
        var user = userRepository.findById(UUID.fromString(userId));
        if(user.isEmpty()) {
            throw new UserServiceException(String.format("User {} does not exist", userId));
        }
        userRepository.deleteById(UUID.fromString(userId));
        return user.get();
    }

    @Override
    public Collection<UserDto> getUsers() {
        return userRepository.findAll().stream().map(this::userToDto).collect(Collectors.toList());
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
        var dto = new UserDto();
        dto.firstName = user.getFirstName();
        dto.lastName = user.getLastName();
        dto.nickname = user.getNickname();
        dto.email = user.getEmail();
        dto.id = user.getId().toString();
        return dto;
    }
}
