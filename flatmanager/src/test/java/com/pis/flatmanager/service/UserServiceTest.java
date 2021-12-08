package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest

public class UserServiceTest {

    @Mock
    Map<String, User> userRepo;

    @Autowired
    private UserService userService; //= new UserServiceImpl();

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

}
