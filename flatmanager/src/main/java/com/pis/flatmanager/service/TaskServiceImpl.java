package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.tasks.CreateTaskDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.FlatRepository;
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
    private UserService userService;

    @Override
    public FlatTask createTask(User user, String flatId, CreateTaskDto taskDto) throws AccessForbiddenException {
        var flat = flatRepository.findById(UUID.fromString(flatId))
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        if(!flat.getUsers().containsKey(user.getId()) && !flat.getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("Does not have access to this flat");
        }

        var task = new FlatTask(
                taskDto.getStartDate(),
                taskDto.getTimeToComplete(),
                taskDto.getRepeatAfter(),
                taskDto.getName()
        );

        flat.getTasks().put(task.getId(), task);
        flatRepository.save(flat);
        return task;
    }

    @Override
    public void deleteTask(User user, String flatId, String taskId) throws AccessForbiddenException {
        var flat = flatRepository.findById(UUID.fromString(flatId))
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        if(!flat.getUsers().containsKey(user.getId()) && !flat.getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("Does not have access to this flat");
        }

        if(!flat.getTasks().containsKey(UUID.fromString(taskId))) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }

        flat.getTasks().remove(UUID.fromString(taskId));
        flatRepository.save(flat);
    }

    @Override
    public FlatTask getTask(User user, String flatId, String taskId) throws AccessForbiddenException {
        var flat = flatRepository.findById(UUID.fromString(flatId))
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        if(!flat.getUsers().containsKey(user.getId()) && !flat.getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("Does not have access to this flat");
        }

        if(!flat.getTasks().containsKey(UUID.fromString(taskId))) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }

        return flat.getTasks().get(UUID.fromString(taskId));
    }

    @Override
    public FlatTask updateTask(User user, String flatId, String taskId, FlatTask patchedTask) throws AccessForbiddenException {
        var flat = flatRepository.findById(UUID.fromString(flatId))
                .orElseThrow(() -> new EntityNotFoundException("Flat with this id does not exist"));

        if(!flat.getUsers().containsKey(user.getId()) && !flat.getOwner().getUserId().equals(user.getId())) {
            throw new AccessForbiddenException("Does not have access to this flat");
        }

        if(!flat.getTasks().containsKey(UUID.fromString(taskId))) {
            throw new EntityNotFoundException("Task with this id does not exist");
        }

        flat.getTasks().replace(UUID.fromString(taskId), patchedTask);
        flatRepository.save(flat);
        return patchedTask;
    }
}
