package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.User;

import java.util.UUID;

public interface TaskService {
    Task createTask(User user, UUID flatId, CreateTaskDto dto) throws AccessForbiddenException;
    void deleteTask(UUID flatId, UUID taskId) throws AccessForbiddenException;
    Task getTask(UUID flatId, UUID taskId) throws AccessForbiddenException;
    Task updateTask(UUID flatId, Task patchedTask) throws AccessForbiddenException;
}
