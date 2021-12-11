package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.*;
import com.pis.flatmanager.exception.UserServiceException;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserDto dto) {
        try {
            var userDto = userService.userToDto(userService.createUser(dto));
            return new ResponseEntity<>(userDto, HttpStatus.CREATED);
        } catch(ValidationException e) {
            return ResponseEntity.badRequest().build();
        } catch(UserServiceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        return new ResponseEntity<>(
                userService.getUsers().stream().map(user -> userService.userToDto(user)).collect(Collectors.toList()),
                HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authUser(@RequestBody VerifyUserDto dto) throws UserServiceException {
        try {
            var isAuth = userService.verifyUser(dto);
            if(isAuth) {
                var user = userService.getUserByUsername(dto.username);
                return new ResponseEntity<>(userService.userToDto(user), HttpStatus.OK);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (UserServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) throws UserServiceException {
        try {
            var dto = userService.userToDto(userService.getUser(id));
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch(UserServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/email")
    public ResponseEntity<UserDto> updateUserEmail(@PathVariable String id, @RequestBody UpdateEmailUserDto dto) throws UserServiceException {
        if(!Objects.equals(id, dto.id)) {
            return ResponseEntity.badRequest().build();
        }
        try {
            var updatedDto = userService.userToDto(userService.updateUserEmail(dto));
            return new ResponseEntity<>(updatedDto, HttpStatus.OK);
        } catch(UserServiceException e) {
            return ResponseEntity.notFound().build();
        }

    }

    @PatchMapping("{id}/password")
    public ResponseEntity<UserDto> updateUserPassword(@PathVariable String id, @RequestBody UpdatePasswordUserDto dto) throws UserServiceException {
        if(!Objects.equals(id, dto.id)) {
            return ResponseEntity.badRequest().build();
        }
        try {
            var updatedDto = userService.userToDto(userService.updateUserPassword(dto));
            return new ResponseEntity<>(updatedDto, HttpStatus.OK);
        } catch(UserServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<UserDto> deleteUserById(@PathVariable String id) throws UserServiceException {
        try {
            var updatedDto = userService.userToDto(userService.deleteUser(id));
            return new ResponseEntity<>(updatedDto, HttpStatus.OK);
        } catch(UserServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
