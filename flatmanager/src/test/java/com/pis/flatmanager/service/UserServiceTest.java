package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.exception.UserServiceException;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.UserRepository;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.Validator;
import java.util.Optional;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    Validator validator;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void mockPasswordEncoder() {
        when(passwordEncoder.encode(any(String.class)))
                .thenReturn(String.valueOf((Answer<String>) invocation -> {
            Object[] args = invocation.getArguments();
            return (String) args[0];
        }));
    }

    @BeforeEach
    void mockValidator() {
        when(validator.validate(any())).thenReturn(Set.of());
    }

    @Test
    public void createUserTest() throws UserServiceException {
        var createUserDto = CreateUserDto.builder()
                .firstName("Jan")
                .lastName("Kowalski")
                .username("jkowal")
                .email("jkowal@test.com")
                .password("jkowal123")
                .build();

        when(userRepository.save(any())).thenReturn(null);
        User user = userService.createUser(createUserDto);
        assertEquals(user.getFirstName(), createUserDto.firstName);
        assertEquals(user.getLastName(), createUserDto.lastName);
        assertEquals(user.getUsername(), createUserDto.username);
        assertEquals(user.getEmail(), createUserDto.email);
    }

    @Test
    public void updatePasswordUserTest() throws UserServiceException {

        var createUserDto = CreateUserDto.builder()
                .firstName("test")
                .lastName("test")
                .username("test")
                .email("test@test.com")
                .password("testtest123")
                .build();

        User createdUser = userService.createUser(createUserDto);

        var updatePasswordUserDto = UpdatePasswordUserDto.builder()
                .id(createdUser.getId().toString())
                .password("testtest321")
                .build();
        when(userRepository.findById(any())).thenReturn(Optional.of(createdUser));
        userService.updateUserPassword(updatePasswordUserDto);
        var user = userService.getUser(createdUser.getId().toString());

        assertEquals(passwordEncoder.encode(updatePasswordUserDto.password), user.getPasswordHash());
    }

    @Test
    public void updateEmailUserTest() throws UserServiceException {
        var createUserDto = CreateUserDto.builder()
                .firstName("test")
                .lastName("test")
                .username("test")
                .email("test@test.com")
                .password("testtest123")
                .build();

        User createdUser = userService.createUser(createUserDto);

        var updateEmailUserDto = UpdateEmailUserDto.builder()
                .id(createdUser.getId().toString())
                .email("test@test.eu").build();

        when(userRepository.findById(any())).thenReturn(Optional.of(createdUser));
        userService.updateUserEmail(updateEmailUserDto);
        var user = userService.getUser(createdUser.getId().toString());
        assertEquals(updateEmailUserDto.email, user.getEmail());
    }

    @Test
    public void deleteUserTest() throws UserServiceException {
        var createUserDto = CreateUserDto.builder()
                .firstName("test")
                .lastName("test")
                .username("test")
                .email("test@test.com")
                .password("testtest123")
                .build();

        User createdUser = userService.createUser(createUserDto);
        when(userRepository.findById(any())).thenReturn(Optional.empty());

        try {
            userService.deleteUser(createdUser.getId().toString());
            var user = userService.getUser(createdUser.getId().toString());
        } catch (UserServiceException e) {
            assertEquals(e.getMessage(), String.format("User {} does not exist", createdUser.getId().toString()));
        }

    }
}
