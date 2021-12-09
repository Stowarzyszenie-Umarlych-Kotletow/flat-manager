package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.UserService;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @MockBean
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @BeforeEach
    void mockPasswordEncoder() {
        when(passwordEncoder.encode(any(String.class)))
                .thenReturn(String.valueOf((Answer<String>) invocation -> {
            Object[] args = invocation.getArguments();
            return (String) args[0];
        }));
    }

    @Test
    public void createUserTest() {
        var createUserDto = new CreateUserDto();
        createUserDto.firstName = "Jan";
        createUserDto.lastName = "Kowalski";
        createUserDto.email = "jkowal@test.com";
        createUserDto.nickname = "jkowal";
        createUserDto.password = "jkowal123";

        User user = userService.createUser(createUserDto);
        assertEquals(user.getFirstName(), createUserDto.firstName);
        assertEquals(user.getLastName(), createUserDto.lastName);
        assertEquals(user.getNickname(), createUserDto.nickname);
        assertEquals(user.getEmail(), createUserDto.email);
    }

    @Test
    public void updatePasswordUserTest() {

        var createUserDto = new CreateUserDto();
        createUserDto.firstName = "test";
        createUserDto.lastName = "test";
        createUserDto.nickname = "test";
        createUserDto.email = "test@test.com";
        createUserDto.password = "testtest123";

        User createdUser = userService.createUser(createUserDto);

        var updatePasswordUserDto = new UpdatePasswordUserDto();
        updatePasswordUserDto.id = createdUser.getId().toString();
        updatePasswordUserDto.password = "testtest321";
        userService.updateUserPassword(updatePasswordUserDto);
        var user = userService.getUser(createdUser.getId().toString());

        user.ifPresent(value -> assertEquals(passwordEncoder.encode(updatePasswordUserDto.password), value.getPasswordHash()));
    }

    @Test
    public void updateEmailUserTest() {
        var createUserDto = new CreateUserDto();
        createUserDto.firstName = "test";
        createUserDto.lastName = "test";
        createUserDto.nickname = "test";
        createUserDto.email = "test@test.com";
        createUserDto.password = "testtest123";

        User createdUser = userService.createUser(createUserDto);

        var updateEmailUserDto = new UpdateEmailUserDto();
        updateEmailUserDto.id = createdUser.getId().toString();
        updateEmailUserDto.email = "test@test.eu";
        userService.updateUserEmail(updateEmailUserDto);
        var user = userService.getUser(createdUser.getId().toString());
        user.ifPresent(value -> assertEquals(updateEmailUserDto.email, value.getEmail()));
    }

    @Test
    public void deleteUserTest() {
        var createUserDto = new CreateUserDto();
        createUserDto.firstName = "test";
        createUserDto.lastName = "test";
        createUserDto.nickname = "test";
        createUserDto.email = "test@test.com";
        createUserDto.password = "testtest123";

        User createdUser = userService.createUser(createUserDto);
        userService.deleteUser(createdUser.getId().toString());

        Optional<User> user = userService.getUser(createdUser.getId().toString());

        assertTrue(user.isEmpty());
    }
}
