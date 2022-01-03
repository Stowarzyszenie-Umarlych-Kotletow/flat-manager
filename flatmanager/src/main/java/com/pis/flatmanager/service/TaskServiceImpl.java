package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.FlatRepository;
import com.pis.flatmanager.repository.TaskRepository;
import com.pis.flatmanager.service.interfaces.TaskService;
import com.pis.flatmanager.service.interfaces.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@NoArgsConstructor
public class TaskServiceImpl implements TaskService {

    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Override
    public Task createTask(User user, UUID flatId, CreateTaskDto taskDto) throws AccessForbiddenException {
        var flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        if(!flat.getUsers().containsKey(user.getId()) && !flat.getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("Does not have access to this flat");
        }

        var task = new Task(
                flatId,
                taskDto.getName(),
                user.getId(),
                taskDto.getStartDate(),
                taskDto.getTimeToComplete(),
                taskDto.getRepeatAfter()
        );

        flat.getTasks().put(task.getId(), new FlatTask(task.getName()));
        flatRepository.save(flat);
        taskRepository.save(task);
        return task;
    }

    @Override
    public void deleteTask(UUID flatId, UUID taskId) throws AccessForbiddenException {
        var flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));


        if(!flat.getTasks().containsKey(taskId)) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }

        flat.getTasks().remove(taskId);
        flatRepository.save(flat);
    }

    @Override
    public Task getTask(UUID flatId, UUID taskId) throws AccessForbiddenException {
        flatRepository.findById(flatId)
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        var task = taskRepository.findById(taskId).orElseThrow(() -> new EntityNotFoundException("Task not found"));
        if(!task.getFlatId().equals(flatId)) {
            throw new EntityNotFoundException("Flat ids do not match");
        }

        return task;
    }

    @Override
    public Task updateTask(UUID flatId, Task patchedTask) throws AccessForbiddenException {
        var flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        if(!flat.getTasks().containsKey(patchedTask.getId())) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }

        flat.getTasks().replace(patchedTask.getId(), new FlatTask(patchedTask.getName()));
        flatRepository.save(flat);
        taskRepository.save(patchedTask);
        return patchedTask;
    }
}
