package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.UserDto;
import com.pis.flatmanager.exception.UserServiceException;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserDto dto) {
        return new ResponseEntity<>(userService.userToDto(userService.createUser(dto)), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getUsers() {
        return new ResponseEntity<>((List<UserDto>) userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) throws UserServiceException {
        return new ResponseEntity<>(userService.userToDto(userService.getUser(id)), HttpStatus.OK);
    }

    @PatchMapping("/{id}/email")
    public ResponseEntity<UserDto> updateUserEmail(@PathVariable String id, @RequestBody UpdateEmailUserDto dto) throws UserServiceException {
        if(!Objects.equals(id, dto.id)) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(userService.userToDto(userService.updateUserEmail(dto)), HttpStatus.OK);
    }

    @PatchMapping("{id}/password")
    public ResponseEntity<UserDto> updateUserPassword(@PathVariable String id, @RequestBody UpdatePasswordUserDto dto) throws UserServiceException {
        if(!Objects.equals(id, dto.id)) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(userService.userToDto(userService.updateUserPassword(dto)), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<UserDto> deleteUserById(@PathVariable String id) throws UserServiceException {
        return new ResponseEntity<>(userService.userToDto(userService.deleteUser(id)), HttpStatus.OK);
    }

}
