package com.pis.flatmanager.dto.tasks;

import com.pis.flatmanager.model.tasks.TaskInstanceInfo;
import lombok.Builder;
import lombok.NonNull;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Builder
@Value
public class TasksScheduleDto implements Serializable {
    @NonNull
    LocalDateTime currentDate;
    Map<UUID, List<TaskInstanceInfo>> taskInstances;
}
