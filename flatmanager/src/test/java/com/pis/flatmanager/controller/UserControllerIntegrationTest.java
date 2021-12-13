package com.pis.flatmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.UserRepository;
import com.pis.flatmanager.service.interfaces.UserService;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@EnableMongoRepositories
public class UserControllerIntegrationTest {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void createNewUserTest() throws Exception {
        CreateUserDto createUserDto = CreateUserDto.builder()
                .firstName("test")
                .lastName("test")
                .username("test")
                .email("test@test.com")
                .password("testtest123")
                .build();

        userRepository.deleteAll();
        mvc.perform(MockMvcRequestBuilders
                .post("/api/v1/users")
                .content(asJsonString(createUserDto))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("test@test.com"));

    }

    @Test
    public void updateEmailUserTest() throws Exception {
        var obj = userRepository.save(new User("test", "test", "test", "test@test.com"));

        var updateUserEmailDto = UpdateEmailUserDto.builder()
                .id(obj.getId().toString())
                .email("test@test.eu")
                .build();

        mvc.perform(MockMvcRequestBuilders
                .patch(String.format("/api/v1/users/%s/email", obj.getId().toString()))
                .content(asJsonString(updateUserEmailDto))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("test@test.eu"));

    }

    @Test
    public void updatePasswordUserTest() throws Exception {
        var user = new User("test", "test", "test", "test@test.com");
        user.setPasswordHash(passwordEncoder.encode("testtest123"));
        var obj = userRepository.save(user);
        var updateUserPasswordDto = UpdatePasswordUserDto.builder()
                .id(obj.getId().toString())
                .password("testtest321")
                .build();

        mvc.perform(MockMvcRequestBuilders
                .patch(String.format("/api/v1/users/%s/password", obj.getId().toString()))
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(updateUserPasswordDto))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("test@test.com"));

        var finalObj = userRepository.findById(obj.getId());
        finalObj.ifPresent(value -> assertNotEquals(user.getPasswordHash(), value.getPasswordHash()));
    }

    @Test
    public void deleteUserTest() throws Exception {
        var user = new User("test", "test", "test", "test@test.com");
        var obj = userRepository.save(user);

        mvc.perform(MockMvcRequestBuilders
                .delete(String.format("/api/v1/users/%s", obj.getId().toString()))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());

        var finalObj = userRepository.findById(obj.getId());
        assertTrue(finalObj.isEmpty());
    }

    @Test
    public void getUsersTest() throws Exception {
        var user = new User("test", "test", "test", "test@test.com");
        var secondUser = new User("test1" ,"test1", "test1", "test1@test.com");

        userRepository.save(user);
        userRepository.save(secondUser);

        mvc.perform(MockMvcRequestBuilders
                .get("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));
    }

    @Test
    public void getUserByIdTest() throws Exception {
        var user = new User("test", "test", "test", "test@test.com");
        var secondUser = new User("test1" ,"test1", "test1", "test1@test.com");

        var createdUser = userRepository.save(user);
        userRepository.save(secondUser);

        mvc.perform(MockMvcRequestBuilders
                        .get(String.format("/api/v1/users/%s", createdUser.getId().toString()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("test@test.com"));
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
