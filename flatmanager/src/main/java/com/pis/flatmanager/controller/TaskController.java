package com.pis.flatmanager.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.dto.tasks.GetScheduleDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.TaskService;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/flats")
public class TaskController {

    @Autowired
    private FlatService flatService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @PutMapping("/{flatId}/tasks")
    public ResponseEntity<?> createTask(@PathVariable UUID flatId, @Valid @RequestBody CreateTaskDto dto) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        var task = taskService.createTask(user, flatId, dto);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @GetMapping("/{flatId}/tasks")
    public ResponseEntity<?> getTasks(@PathVariable UUID flatId) {
        var tasks = flatService.getFlatTasks(flatId);
        return new ResponseEntity<>(tasks, HttpStatus.CREATED);
    }

    @PostMapping("/{flatId}/tasks-schedule")
    public ResponseEntity<?> getTasksSchedule(@PathVariable UUID flatId, @Valid @RequestBody GetScheduleDto params) throws AccessForbiddenException {
        var schedule = taskService.getTasksSchedule(flatId, params.getFrom(), params.getUntil());
        return new ResponseEntity<>(schedule, HttpStatus.OK);
    }

    @DeleteMapping("/{flatId}/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable UUID flatId, @PathVariable UUID taskId) throws AccessForbiddenException {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(path = "/{flatId}/tasks/{taskId}", consumes = "application/json-patch+json")
    public ResponseEntity<?> updateTask(@PathVariable UUID flatId, @PathVariable UUID taskId, @RequestBody JsonPatch patch) throws AccessForbiddenException, JsonPatchException, JsonProcessingException {
        Task task = taskService.getTask(taskId);
        var patchedTask = applyPatchToTask(patch, task);
        if(!patchedTask.getId().equals(task.getId())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(taskService.updateTask(patchedTask));
    }



    private Task applyPatchToTask(JsonPatch patch, Task targetTask) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetTask, JsonNode.class));
        return objectMapper.treeToValue(patched, Task.class);
    }
}
