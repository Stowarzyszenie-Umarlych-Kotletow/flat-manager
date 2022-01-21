package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.users.VerifyUserDto;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        var password = authentication.getCredentials().toString();

        try {
            boolean isAuthenticated = userService.verifyUser(new VerifyUserDto(authentication.getName(), password));
            if (isAuthenticated) {
                return new UsernamePasswordAuthenticationToken(null, password, Collections.emptyList());
            }
        } catch (EntityNotFoundException ex) {
            throw new BadCredentialsException(ex.getMessage(), ex);
        }
        throw new BadCredentialsException("Invalid credentials");
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
