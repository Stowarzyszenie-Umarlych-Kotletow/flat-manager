package com.pis.flatmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.dto.flats.FlatDto;
import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.dto.tasks.GetScheduleDto;
import com.pis.flatmanager.dto.tasks.TasksScheduleDto;
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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.Duration;
import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@EnableMongoRepositories
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class TaskControllerIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private RequestUtil requestUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenManager jwtTokenManager;

    @Autowired
    private MockMvc mvc;

    @Test
    public void getTaskScheduleTest() throws Exception {
        var user = userService.createUser(new CreateUserDto(
                "test", "test", "username", "username@example.com", "testtest123"
        ));
        var token = jwtTokenManager.generateToken(user.getDetails());
        var now = LocalDateTime.now();
        CreateFlatDto createFlatDto = CreateFlatDto.builder()
                .name("testflat")
                .build();
        // Create flat
        var flatResult = mvc.perform(requestUtil.json(MockMvcRequestBuilders
                        .post("/api/v1/flats"), createFlatDto, token))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("name").value("testflat")).andReturn();
        var flat = objectMapper.readValue(flatResult.getResponse().getContentAsString(), FlatDto.class);
        // Create task
        CreateTaskDto createTaskDto = CreateTaskDto.builder()
                .name("Test task")
                .startDate(now)
                .endDate(now.plusDays(14))
                .repeatAfter(Duration.ofDays(7))
                .timeToComplete(Duration.ofDays(3))
                .build();

        mvc.perform(requestUtil.json(MockMvcRequestBuilders
                        .put(String.format("/api/v1/flats/%s/tasks", flat.getId())), createTaskDto, token))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("name").value("Test task"));
        // Get schedule
        var scheduleRequest = MockMvcRequestBuilders.post(String.format("/api/v1/flats/%s/tasks-schedule", flat.getId()));
        var scheduleBody = new GetScheduleDto(null, now.plusDays(30));
        var scheduleResult = mvc.perform(requestUtil.json(scheduleRequest, scheduleBody, token))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        var scheduleResponseText = scheduleResult.getResponse().getContentAsString();
        var scheduleResponse = objectMapper.readValue(scheduleResponseText, TasksScheduleDto.class);

        assertEquals(1, scheduleResponse.getTaskInstances().size());

    }


}
