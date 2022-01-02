package com.pis.flatmanager.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.Flat;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.TaskService;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/flats")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @PutMapping("/{flatId}/tasks")
    public ResponseEntity<?> createTask(@PathVariable String flatId, @Valid @RequestBody CreateTaskDto dto) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        FlatTask task = taskService.createTask(user, flatId, dto);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @DeleteMapping("/{flatId}/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable String flatId, @PathVariable String taskId) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        taskService.deleteTask(user, flatId, taskId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(path = "/{flatId}/tasks/{taskId}", consumes = "application/json-patch+json")
    public ResponseEntity<?> updateTask(@PathVariable String flatId, @PathVariable String taskId, @RequestBody JsonPatch patch) throws AccessForbiddenException, JsonPatchException, JsonProcessingException {
        User user = userService.getCurrentUser();
        FlatTask task = taskService.getTask(user, flatId, taskId);
        FlatTask patchedTask = applyPatchToTask(patch, task);
        taskService.updateTask(user, flatId, taskId, patchedTask);
        return ResponseEntity.ok(patchedTask);
    }

    private FlatTask applyPatchToTask(JsonPatch patch, FlatTask targetTask) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetTask, JsonNode.class));
        return objectMapper.treeToValue(patched, FlatTask.class);
    }
}
