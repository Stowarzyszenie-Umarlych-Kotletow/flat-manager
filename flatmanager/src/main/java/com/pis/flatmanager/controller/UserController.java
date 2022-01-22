package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.users.UserDto;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController  {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        return new ResponseEntity<>(
                userService.getUsers().stream().map(userService::userToDto).collect(Collectors.toList()),
                HttpStatus.OK);
    }

    @GetMapping("/by/id/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) throws EntityNotFoundException {
        var dto = userService.userToDto(userService.getUser(id));
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @GetMapping("/by/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) throws EntityNotFoundException {
        var dto = userService.userToDto(userService.getUserByUsername(username));
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

}
