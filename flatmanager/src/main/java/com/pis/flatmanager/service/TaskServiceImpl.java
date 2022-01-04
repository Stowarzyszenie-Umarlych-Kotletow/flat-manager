package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.dto.tasks.TasksScheduleDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.exception.InvalidOperationException;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.TaskRepository;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.TaskSchedulingService;
import com.pis.flatmanager.service.interfaces.TaskService;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

@Service
@NoArgsConstructor
public class TaskServiceImpl implements TaskService {
    public static final Integer MAX_SCHEDULE_INSTANCES = 3;

    @Autowired
    private FlatService flatService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskSchedulingService taskSchedulingService;

    @Override
    public Task createTask(User user, UUID flatId, CreateTaskDto taskDto) throws AccessForbiddenException {
        if (taskDto.getRepeatAfter() != null && taskDto.getRepeatAfter().compareTo(taskDto.getTimeToComplete()) < 0) {
            throw new ValidationException("RepeatAfter must not be less than TimeToComplete");
        }
        if (taskDto.getEndDate() != null && taskDto.getEndDate().compareTo(taskDto.getStartDate()) < 0) {
            throw new ValidationException("EndDate must not be less than StartDate");
        }
        var flat = flatService.getFlatAsUser(user, flatId);

        var task = new Task(
                flatId,
                taskDto.getName(),
                user.getId(),
                taskDto.getStartDate(),
                taskDto.getTimeToComplete()
        );
        task.setRepeatAfter(taskDto.getRepeatAfter());
        if (taskDto.getUserIds() != null) {
            for (var userId : taskDto.getUserIds()) {
                task.getUserDoneCounter().put(userId, 0);
            }
        }

        flat.getTasks().put(task.getId(), new FlatTask(task.getName()));
        flatService.updateFlat(flat);
        taskRepository.save(task);
        return task;
    }

    @Override
    public void deleteTask(UUID taskId) throws AccessForbiddenException {
        var task = getTask(taskId);
        var flat = flatService.getFlat(task.getFlatId());

        if(!flat.getTasks().containsKey(taskId)) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }

        flat.getTasks().remove(taskId);
        flatService.updateFlat(flat);
        taskRepository.delete(task);
    }

    @Override
    public Task getTask(UUID taskId) throws AccessForbiddenException {
        return taskRepository.findById(taskId).orElseThrow(() -> new EntityNotFoundException("Task not found"));
    }

    @Override
    public Task updateTask(Task patchedTask) throws AccessForbiddenException {
        var flat = flatService.getFlat(patchedTask.getFlatId());

        if(!flat.getTasks().containsKey(patchedTask.getId())) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }


        flat.getTasks().replace(patchedTask.getId(), new FlatTask(patchedTask.getName()));
        flatService.updateFlat(flat);
        taskRepository.save(patchedTask);
        return patchedTask;
    }

    @Override
    public Task setCompletedBy(User user, UUID taskId, UUID taskInstanceId) throws AccessForbiddenException {
        var task = getTask(taskId);
        var instance = task.getInstances().stream().filter(x -> x.getId().equals(taskInstanceId)).findFirst().orElseThrow();

        if (instance.isCompleted())
            throw new InvalidOperationException("The task had already been completed");
        if (!task.getUserDoneCounter().containsKey(user.getId()))
            throw new AccessForbiddenException("You are not assigned to this task");

        instance.setDateCompleted(LocalDateTime.now());
        instance.setCompletedByUserId(user.getId());
        // update stats
        task.getUserDoneCounter().merge(user.getId(), 1, Integer::sum);

        return taskRepository.save(task);
    }

    @Override
    public TasksScheduleDto getTasksSchedule(UUID flatId, LocalDateTime from, @NotNull LocalDateTime until) throws AccessForbiddenException {
        var flat = flatService.getFlat(flatId);
        var now = LocalDateTime.now();

        var result = new TasksScheduleDto(now, new HashMap<>());
        for (var taskId : flat.getTasks().keySet()) {
            var task = getTask(taskId);
            var taskFrom = ObjectUtils.defaultIfNull(from, task.getStartDate());
            taskSchedulingService.updateTaskInstances(task, now);
            updateTask(task);
            var instances = taskSchedulingService.getTaskSchedule(task, now, taskFrom, until, MAX_SCHEDULE_INSTANCES);
            result.getTaskInstances().put(taskId, instances);
        }
        return result;
    }
}
