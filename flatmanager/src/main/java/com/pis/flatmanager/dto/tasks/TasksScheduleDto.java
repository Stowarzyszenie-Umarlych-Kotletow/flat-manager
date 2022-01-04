package com.pis.flatmanager.dto.tasks;

import com.pis.flatmanager.model.tasks.TaskInstanceInfo;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TasksScheduleDto implements Serializable {
    @NonNull
    LocalDateTime currentDate;
    Map<UUID, List<TaskInstanceInfo>> taskInstances = new HashMap<>();
}
