package com.pis.flatmanager.service;

import com.github.fge.jsonpatch.Iterables;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.TaskInstance;
import com.pis.flatmanager.model.tasks.TaskInstanceInfo;
import com.pis.flatmanager.model.tasks.TaskInstanceState;
import com.pis.flatmanager.service.interfaces.TaskSchedulingService;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
public class TaskSchedulingServiceImpl implements TaskSchedulingService {

    private TaskInstanceState getScheduledState(Task task, TaskInstanceInfo instance, LocalDateTime now) {
        var validUntil = instance.getDate().plus(task.getTimeToComplete());
        if (now.isAfter(validUntil))
            return TaskInstanceState.PAST;
        if (instance.getDate().isAfter(now))
            return TaskInstanceState.FUTURE;
        return TaskInstanceState.SCHEDULED;
    }

    public List<TaskInstanceInfo> getExistingSchedule(Task task, LocalDateTime from, LocalDateTime until) {
        return task.getInstances().stream()
                .filter(instance -> !from.isAfter(instance.getDateScheduled()) && until.isAfter(instance.getDateScheduled()))
                .map(instance -> new TaskInstanceInfo(instance.getId(),
                        instance.getScheduledUserId(),
                        instance.getCompletedByUserId(),
                        TaskInstanceState.PAST,
                        instance.getDateScheduled())
                ).collect(Collectors.toList());
    }

    @Override
    public List<TaskInstanceInfo> getTaskSchedule(Task task, LocalDateTime now, LocalDateTime from, LocalDateTime until, int maxInstances) {
        var existingSchedule = getExistingSchedule(task, from, until);
        var newScheduled = scheduleInstances(task, until, maxInstances);
        // combine lists
        existingSchedule.addAll(newScheduled);
        // update state with relation to current date
        existingSchedule.forEach(instance -> instance.setState(getScheduledState(task, instance, now)));

        return existingSchedule;
    }

    @Override
    public Task updateTaskInstances(Task task, LocalDateTime now) {
        var counter = new HashMap<>(task.getUserDoneCounter());
        // create past instances plus one in the future
        var period = task.getRepeatAfter() == null ? Duration.ZERO : task.getRepeatAfter();
        var instances = scheduleInstances(task, counter, now, 100);

        for (var instance : instances) {
            var newInstance = new TaskInstance(instance.getDate());
            newInstance.setScheduledUserId(instance.getUserId());
            task.getInstances().add(newInstance);
        }
        return task;
    }

    public UUID getNextScheduledUser(Map<UUID, Integer> counters) {
        if (counters.isEmpty()) {
            return null;
        }
        return Collections.min(counters.entrySet(), Map.Entry.comparingByValue()).getKey();
    }

    public TaskInstanceInfo scheduleOne(Task task, Map<UUID, Integer> userCounter, LocalDateTime time) {
        var selectedUser = getNextScheduledUser(userCounter);
        if (selectedUser != null)
            userCounter.merge(selectedUser, 1, Integer::sum);
        return new TaskInstanceInfo(UUID.randomUUID(), selectedUser, null, TaskInstanceState.FUTURE, time);
    }

    public List<TaskInstanceInfo> scheduleInstances(Task task, LocalDateTime until, int maxInstances) {
        return scheduleInstances(task, new HashMap<>(task.getUserDoneCounter()), until, maxInstances);
    }

    public List<TaskInstanceInfo> scheduleInstances(Task task, Map<UUID, Integer> userCounter, LocalDateTime until, int maxInstances) {
        // set proper bound
        if (!task.canScheduleAt(until)
                && until.isAfter(task.getStartDate())
                && Objects.nonNull(task.getEndDate()))
            until = task.getEndDate();
        // handle non-periodic tasks
        var period = task.getRepeatAfter();
        if (period == null) {
            until = task.getStartDate();
            period = Duration.ofDays(1); // does not matter
        }
        // determine next occurrence
        var lastDate = task.getInstances().isEmpty()
                ? task.getStartDate()
                : Iterables.getLast(task.getInstances()).getDateScheduled().plus(period);

        var newInstances = new ArrayList<TaskInstanceInfo>();
        // schedule until we reach the target date
        while (!lastDate.isAfter(until) && newInstances.size() < maxInstances) {
            newInstances.add(scheduleOne(task, userCounter, lastDate));
            lastDate = lastDate.plus(period);
        }

        return newInstances;
    }

}
