package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.User;

public interface TaskService {
    FlatTask createTask(User user, String flatId, CreateTaskDto dto) throws AccessForbiddenException;
    void deleteTask(User user, String flatId, String taskId) throws AccessForbiddenException;
    FlatTask getTask(User user, String flatId, String taskId) throws AccessForbiddenException;
    FlatTask updateTask(User user, String flatId, String taskId, FlatTask patchedTask) throws AccessForbiddenException;
}
