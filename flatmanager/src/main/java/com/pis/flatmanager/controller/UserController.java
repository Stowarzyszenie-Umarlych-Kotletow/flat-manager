package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.VerifyUserDto;
import com.pis.flatmanager.exception.UserDuplicateException;
import com.pis.flatmanager.exception.UserNotFoundException;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDto dto) throws UserDuplicateException {
        var userDto = userService.userToDto(userService.createUser(dto));
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<?>> getUsers() {
        return new ResponseEntity<>(
                userService.getUsers().stream().map(user -> userService.userToDto(user)).collect(Collectors.toList()),
                HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authUser(@Valid @RequestBody VerifyUserDto dto) throws UserNotFoundException {
        var isAuth = userService.verifyUser(dto);
        if(isAuth) {
            var user = userService.getUserByUsername(dto.getUsername());
            return new ResponseEntity<>(userService.userToDto(user), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) throws UserNotFoundException {
        var dto = userService.userToDto(userService.getUser(id));
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PatchMapping("/{id}/email")
    public ResponseEntity<?> updateUserEmail(@PathVariable String id, @Valid @RequestBody UpdateEmailUserDto dto) throws UserNotFoundException {
        if(!Objects.equals(id, dto.getId())) {
            return ResponseEntity.badRequest().build();
        }
        var updatedDto = userService.userToDto(userService.updateUserEmail(dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);

    }

    @PatchMapping("{id}/password")
    public ResponseEntity<?> updateUserPassword(@PathVariable String id, @Valid @RequestBody UpdatePasswordUserDto dto) throws UserNotFoundException {
        if(!Objects.equals(id, dto.getId())) {
            return ResponseEntity.badRequest().build();
        }
        var updatedDto = userService.userToDto(userService.updateUserPassword(dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable String id) throws UserNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public String handleUserNotFoundException(UserNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserDuplicateException.class)
    public String handleUserDuplicateException(UserDuplicateException ex) {
        return ex.getMessage();
    }

}
