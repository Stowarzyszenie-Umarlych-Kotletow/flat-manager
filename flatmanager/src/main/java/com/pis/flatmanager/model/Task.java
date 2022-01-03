package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Data
@Document(collection = "tasks")
public class Task implements Serializable {

    @Id
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

    List<TaskInstance> instances = new ArrayList<>();

    @NotNull
    @NonNull
    LocalDateTime startDate;

    LocalDateTime endDate;

    @NotNull
    @NonNull
    Duration timeToComplete;

    @NotNull
    @NonNull
    Duration repeatAfter;
}
