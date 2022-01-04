package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.tasks.TaskInstanceInfo;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskSchedulingService {
    List<TaskInstanceInfo> getTaskSchedule(Task task, LocalDateTime now, LocalDateTime from, LocalDateTime until, int maxInstances);
    Task updateTaskInstances(Task task, LocalDateTime now);
}
