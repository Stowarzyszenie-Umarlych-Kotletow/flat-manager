package com.pis.flatmanager.integrationtests;

import com.pis.flatmanager.dto.users.CreateUserDto;
import com.pis.flatmanager.dto.users.UpdateEmailUserDto;
import com.pis.flatmanager.dto.users.UpdatePasswordUserDto;
import com.pis.flatmanager.service.JwtTokenManager;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.UserRepository;
import com.pis.flatmanager.service.interfaces.UserService;
import com.pis.flatmanager.utils.RequestUtil;
import org.hamcrest.Matchers;
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

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@EnableMongoRepositories
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenManager jwtTokenManager;

    @Autowired
    private RequestUtil requestUtil;

    @Test
    public void createNewUserTest() throws Exception {
        CreateUserDto createUserDto = new CreateUserDto(
                "test", "test", "test", "test@example.com", "testtest123"
        );

        mockMvc.perform(requestUtil.json(MockMvcRequestBuilders.post("/api/v1/auth/register"), createUserDto))
        .andExpect(MockMvcResultMatchers.status().isCreated())
        .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
        .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
        .andExpect(MockMvcResultMatchers.jsonPath("username").value("test"))
        .andExpect(MockMvcResultMatchers.jsonPath("email").value("test@example.com"));
    }

    @Test
    public void updateEmailUserTest() throws Exception {
        var user = createDummyUser("test");
        var token = getTokenForUser(user);
        var updateUserEmailDto = new UpdateEmailUserDto("test@example.com");
        mockMvc.perform(requestUtil.json(MockMvcRequestBuilders.post("/api/v1/account/email"), updateUserEmailDto, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("test@example.com"));
    }

    @Test
    public void updatePasswordUserTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));
        var token = getTokenForUser(user);

        var updateUserPasswordDto = new UpdatePasswordUserDto("testtest321");

        mockMvc.perform(requestUtil.json(MockMvcRequestBuilders.post("/api/v1/account/password"), updateUserPasswordDto, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("username"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("username@example.com"));

        var finalObj = userService.getUser(user.getId());
        assertNotEquals(finalObj.getPasswordHash(), user.getPasswordHash());
    }

    @Test
    public void deleteUserTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));
        var token = getTokenForUser(user);
        mockMvc.perform(requestUtil.json(MockMvcRequestBuilders.post("/api/v1/account/delete"), null, token))
                .andExpect(MockMvcResultMatchers.status().isOk());

        var finalObj = userRepository.findById(user.getId());
        assertTrue(finalObj.isEmpty());
    }

    @Test
    public void getUsersTest() throws Exception {
        var user = createDummyUser("test1");
        var secondUser = createDummyUser("test2");

        var token = getTokenForUser(user);

        mockMvc.perform(requestUtil.json(MockMvcRequestBuilders.get("/api/v1/users"), null, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));
    }

    @Test
    public void getUserByIdTest() throws Exception {
        var user = createDummyUser("test1");
        var secondUser = createDummyUser("test2");

        var token = getTokenForUser(user);

        var baseRequest = MockMvcRequestBuilders.get(String.format("/api/v1/users/by/id/%s", user.getId().toString()));
        mockMvc.perform(requestUtil.json(baseRequest, null, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("firstName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("lastName").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("test1"))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value("test1@example.com"));
    }

    private String getTokenForUser(User user) {
        return jwtTokenManager.generateToken(user.getDetails());
    }

    private User createDummyUser(String username) {
        return userService.createUser(new CreateUserDto(
                "test", "test", username, username+"@example.com", "testtest123"
        ));
    }

}
