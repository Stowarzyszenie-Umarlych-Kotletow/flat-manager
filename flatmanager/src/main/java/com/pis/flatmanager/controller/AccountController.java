package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    private UserService userService;

    @PatchMapping("/email")
    public ResponseEntity<?> updateUserEmail(@Valid @RequestBody UpdateEmailUserDto dto) throws EntityNotFoundException, AccessForbiddenException {
        var user = userService.getCurrentUser();
        var updatedDto = userService.userToDto(userService.updateUserEmail(user, dto.getEmail()));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);

    }

    @PatchMapping("/password")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody UpdatePasswordUserDto dto) throws EntityNotFoundException, AccessForbiddenException {
        var user = userService.getCurrentUser();
        var updatedDto = userService.userToDto(userService.updateUserPassword(user, dto.getPassword()));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser() throws EntityNotFoundException, AccessForbiddenException {
        var user = userService.getCurrentUser();
        userService.deleteUser(user.getId().toString());
        return ResponseEntity.ok().build();
    }
}
