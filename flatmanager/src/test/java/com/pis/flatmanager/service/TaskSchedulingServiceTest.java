package com.pis.flatmanager.service;

import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.tasks.TaskInstanceState;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class TaskSchedulingServiceTest {

    @InjectMocks
    private TaskSchedulingServiceImpl taskSchedulingService;

    @Test
    public void generateScheduleForPeriodicTaskWithExistingInstancesTest() {
        var now = LocalDateTime.parse("2020-10-14T12:00:00");

        var users = List.of(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID());

        var task = new Task(UUID.randomUUID(), "Test task", users.get(0), now.minusDays(10), Duration.ofDays(3));
        task.setRepeatAfter(Duration.ofDays(7));

        for (var user : users) {
            task.getUserDoneCounter().put(user, 0);
        }

        taskSchedulingService.updateTaskInstances(task, task.getStartDate());

        var schedule = taskSchedulingService.getTaskSchedule(task, now, now.minusDays(30), now.plusDays(30), 50);
        assertEquals(now.minusDays(10), schedule.get(0).getDate());
        assertEquals(TaskInstanceState.PAST, schedule.get(0).getState());
        assertEquals(now.minusDays(3), schedule.get(1).getDate());
        assertEquals(TaskInstanceState.SCHEDULED, schedule.get(1).getState());
        assertEquals(now.plusDays(4), schedule.get(2).getDate());
        assertEquals(TaskInstanceState.FUTURE, schedule.get(2).getState());
        assertEquals(6, schedule.size());
    }

    @Test
    public void generateScheduleForPeriodicTaskTest() {
        var now = LocalDateTime.parse("2020-10-14T12:00:00");

        var users = List.of(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID());

        var task = new Task(UUID.randomUUID(), "Test task", users.get(0), now.minusDays(10), Duration.ofDays(3));
        task.setRepeatAfter(Duration.ofDays(7));

        for (var user : users) {
            task.getUserDoneCounter().put(user, 0);
        }

        var schedule = taskSchedulingService.getTaskSchedule(task, now, now.minusDays(30), now.plusDays(30), 50);
        assertEquals(now.minusDays(10), schedule.get(0).getDate());
        assertEquals(TaskInstanceState.PAST, schedule.get(0).getState());
        assertEquals(now.minusDays(3), schedule.get(1).getDate());
        assertEquals(TaskInstanceState.SCHEDULED, schedule.get(1).getState());
        assertEquals(now.plusDays(4), schedule.get(2).getDate());
        assertEquals(TaskInstanceState.FUTURE, schedule.get(2).getState());
    }

    @Test
    public void generateScheduleForPeriodicTaskSameDayTest() {
        var now = LocalDateTime.parse("2020-10-14T12:00:00");

        var users = List.of(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID());

        var task = new Task(UUID.randomUUID(), "Test task", users.get(0), now, Duration.ofDays(3));
        task.setRepeatAfter(Duration.ofDays(7));

        for (var user : users) {
            task.getUserDoneCounter().put(user, 0);
        }

        var schedule = taskSchedulingService.getTaskSchedule(task, now, now.minusDays(30), now.plusDays(30), 50);
        assertEquals(now, schedule.get(0).getDate());
        assertEquals(TaskInstanceState.SCHEDULED, schedule.get(0).getState());

    }

    @Test
    public void generateScheduleForSingleTaskTest() {
        var now = LocalDateTime.parse("2020-10-14T12:00:00");
        var users = List.of(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID());
        var task = new Task(UUID.randomUUID(), "Test task", users.get(0), now.minusDays(10), Duration.ofDays(3));

        for (var user : users) {
            task.getUserDoneCounter().put(user, 0);
        }
        var schedule = taskSchedulingService.getTaskSchedule(task, now, now.minusDays(30), now.plusDays(30), 50);

        assertEquals(now.minusDays(10), schedule.get(0).getDate());
        assertEquals(TaskInstanceState.PAST, schedule.get(0).getState());
    }

    @Test
    public void updateTaskScheduleTest() {
        var now = LocalDateTime.parse("2020-10-14T12:00:00");
        var users = List.of(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID());
        var task = new Task(UUID.randomUUID(), "Test task", users.get(0), now.minusDays(10), Duration.ofDays(3));
        task.setRepeatAfter(Duration.ofDays(7));
        for (var user : users) {
            task.getUserDoneCounter().put(user, 0);
        }
        taskSchedulingService.updateTaskInstances(task, now);

        var instances = new ArrayList<>(task.getInstances());
        assertEquals(now.minusDays(10), instances.get(0).getDateScheduled());
        assertEquals(now.minusDays(3), instances.get(1).getDateScheduled());
        assertEquals(2, instances.size());

        // make sure another call does not change that
        taskSchedulingService.updateTaskInstances(task, now);
        assertEquals(instances.size(), task.getInstances().size());
    }
}
