package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.UserDto;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import javax.validation.Validator;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final Map<UUID, User> userRepo = new HashMap<>();

    @Autowired
    private Validator validator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(CreateUserDto userDto) throws ValidationException {
        User user = new User(userDto.firstName, userDto.lastName, userDto.nickname, userDto.email, passwordEncoder.encode(userDto.password));
        var violations = validator.validate(user);
        if(!violations.isEmpty()) {
            throw new ValidationException("Validation failed");
        }
        userRepo.put(user.getId(), user);
        return user;
    }

    @Override
    public void updateUserPassword(UpdatePasswordUserDto userDto) throws ValidationException {
        var user = userRepo.get(UUID.fromString(userDto.id));
        user.setPasswordHash(passwordEncoder.encode(userDto.password));
        userRepo.replace(user.getId(), user);
    }

    @Override
    public void updateUserEmail(UpdateEmailUserDto userDto) throws ValidationException{
        var user = userRepo.get(UUID.fromString(userDto.id));
        user.setEmail(userDto.email);
        var violations = validator.validate(user);
        if(!violations.isEmpty()) {
            throw new ValidationException("Validation failed");
        }
        userRepo.replace(user.getId(), user);
    }

    @Override
    public void deleteUser(String userId) {
        userRepo.remove(UUID.fromString(userId));
    }

    @Override
    public Collection<UserDto> getUsers() {
        return userRepo.values().stream().map(user -> {
            var dto = new UserDto();
            dto.id = user.getId().toString();
            dto.firstName = user.getFirstName();
            dto.lastName = user.getLastName();
            dto.email = user.getEmail();
            dto.nickname = user.getNickname();
            return dto;
        }).collect(Collectors.toList());

    }
}
