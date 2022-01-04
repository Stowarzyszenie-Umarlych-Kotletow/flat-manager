package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.dto.tasks.TasksScheduleDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.User;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

public interface TaskService {
    Task createTask(User user, UUID flatId, CreateTaskDto dto) throws AccessForbiddenException;
    void deleteTask(UUID taskId) throws AccessForbiddenException;
    Task getTask(UUID taskId) throws AccessForbiddenException;
    Task updateTask(Task patchedTask) throws AccessForbiddenException;
    Task setCompletedBy(User user, UUID taskId, UUID taskInstanceId) throws AccessForbiddenException;
    TasksScheduleDto getTasksSchedule(UUID flatId, LocalDateTime from, @NotNull LocalDateTime until) throws AccessForbiddenException;

}
