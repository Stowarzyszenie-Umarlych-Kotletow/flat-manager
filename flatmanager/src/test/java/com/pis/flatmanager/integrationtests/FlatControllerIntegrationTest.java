package com.pis.flatmanager.integrationtests;

import com.pis.flatmanager.dto.flats.AddUserFlatDto;
import com.pis.flatmanager.dto.flats.UpdateNameFlatDto;
import com.pis.flatmanager.dto.users.CreateUserDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.model.FlatRole;
import com.pis.flatmanager.repository.FlatRepository;
import com.pis.flatmanager.service.JwtTokenManager;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.UserService;
import com.pis.flatmanager.utils.RequestUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@EnableMongoRepositories
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class FlatControllerIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private FlatService flatService;

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

    @Test
    public void addUserToFlatTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));

        var user2 = userService.createUser(new CreateUserDto(
                "test", "test", "username2", "username2@example.com", "testtest123"
        ));

        var token = jwtTokenManager.generateToken(user.getDetails());

        CreateFlatDto createFlatDto = CreateFlatDto.builder()
                .name("testflat")
                .build();

        flatRepository.deleteAll();
        var flat = flatService.createFlat(user, createFlatDto);

        AddUserFlatDto addUserFlatDto = AddUserFlatDto.builder().userId(user2.getId()).role(FlatRole.USER).build();

        mvc.perform(requestUtil.json(MockMvcRequestBuilders
                .put(String.format("/api/v1/flats/%s/users", flat.getId().toString())), addUserFlatDto, token))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("name").value("testflat"))
                .andExpect(MockMvcResultMatchers.jsonPath("users").isArray());
    }

    @Test
    public void getFlatInfoTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));

        var token = jwtTokenManager.generateToken(user.getDetails());

        CreateFlatDto createFlatDto = CreateFlatDto.builder()
                .name("testflat")
                .build();

        flatRepository.deleteAll();
        var flat = flatService.createFlat(user, createFlatDto);

        mvc.perform(requestUtil.json(MockMvcRequestBuilders
                        .get(String.format("/api/v1/flats/%s", flat.getId().toString())), null, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("name").value("testflat"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.users").isArray());
    }

    @Test
    public void updateFlatNameTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));

        var token = jwtTokenManager.generateToken(user.getDetails());

        CreateFlatDto createFlatDto = CreateFlatDto.builder()
                .name("testflat")
                .build();

        flatRepository.deleteAll();
        var flat = flatService.createFlat(user, createFlatDto);

        UpdateNameFlatDto updateNameFlatDto = UpdateNameFlatDto.builder().name("newname").build();

        mvc.perform(requestUtil.json(MockMvcRequestBuilders
                        .post(String.format("/api/v1/flats/%s/name", flat.getId().toString())), updateNameFlatDto, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("name").value("newname"));
    }

    @Test
    public void deleteFlatByIdTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));

        var token = jwtTokenManager.generateToken(user.getDetails());

        CreateFlatDto createFlatDto = CreateFlatDto.builder()
                .name("testflat")
                .build();

        flatRepository.deleteAll();
        var flat = flatService.createFlat(user, createFlatDto);

        mvc.perform(requestUtil.json(MockMvcRequestBuilders
                        .delete(String.format("/api/v1/flats/%s", flat.getId().toString())), null, token))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }





}
