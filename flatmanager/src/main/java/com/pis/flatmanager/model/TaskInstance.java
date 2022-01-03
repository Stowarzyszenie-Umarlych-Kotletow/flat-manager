package com.pis.flatmanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
public class TaskInstance {
    @Id
    UUID id = UUID.randomUUID();

    UUID completedByUser;

    LocalDateTime dateScheduled;

    LocalDateTime dateCompleted;

}
