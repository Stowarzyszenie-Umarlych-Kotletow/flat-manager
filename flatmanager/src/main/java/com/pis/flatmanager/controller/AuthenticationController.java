package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.users.CreateUserDto;
import com.pis.flatmanager.dto.users.UserDto;
import com.pis.flatmanager.service.JwtTokenManager;
import com.pis.flatmanager.exception.EntityDuplicateException;
import com.pis.flatmanager.model.jwt.JwtRequest;
import com.pis.flatmanager.model.jwt.JwtResponse;
import com.pis.flatmanager.service.UserServiceImpl;
import com.pis.flatmanager.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
@SecurityRequirements
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenManager jwtTokenUtil;

    @Autowired
    private UserServiceImpl userDetailsService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserDto dto) throws EntityDuplicateException {
        var userDto = userService.userToDto(userService.createUser(dto));
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
