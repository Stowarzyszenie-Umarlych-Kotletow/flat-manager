package com.pis.flatmanager.dto.tasks;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto implements Serializable {
    private UUID id;

    @NotNull
    @NonNull
    private UUID flatId;

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private UUID ownerId;

    private String description;

    Map<UUID, Integer> userDoneCounter = new HashMap<>();

    @NotNull
    @NonNull
    LocalDateTime startDate;

    LocalDateTime endDate;

    @NotNull
    @NonNull
    Duration timeToComplete;

    Duration repeatAfter;
}
