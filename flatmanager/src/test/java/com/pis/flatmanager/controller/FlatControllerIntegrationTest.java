package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.repository.FlatRepository;
import com.pis.flatmanager.service.JwtTokenManager;
import com.pis.flatmanager.service.interfaces.UserService;
import com.pis.flatmanager.utils.RequestUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@EnableMongoRepositories
public class FlatControllerIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private RequestUtil requestUtil;

    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private JwtTokenManager jwtTokenManager;

    @Autowired
    private MockMvc mvc;

    @Test
    public void createNewFlatTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));
        var token = jwtTokenManager.generateToken(user.getDetails());

        CreateFlatDto createFlatDto = CreateFlatDto.builder()
                .name("testflat")
                .build();

        flatRepository.deleteAll();
        mvc.perform(requestUtil.json(MockMvcRequestBuilders
                .post("/api/v1/flats"), createFlatDto, token))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("name").value("testflat"));

        userService.deleteAllUsers();

    }


}
