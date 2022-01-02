package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
public class FlatTask implements Serializable {
    @Id
    UUID id = UUID.randomUUID();

    Map<UUID, Integer> userDoneCounter = new HashMap<>();

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

    @NotBlank
    @NonNull
    String name;

    String description;

}
