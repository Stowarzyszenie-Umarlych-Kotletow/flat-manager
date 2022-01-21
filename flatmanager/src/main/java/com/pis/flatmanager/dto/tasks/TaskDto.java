package com.pis.flatmanager.dto.tasks;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Builder
@Value
public class TaskDto implements Serializable {
    UUID id;

    @NotNull
    @NonNull UUID flatId;

    @NotNull
    @NonNull String name;

    @NotNull
    @NonNull UUID ownerId;

    String description;

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
