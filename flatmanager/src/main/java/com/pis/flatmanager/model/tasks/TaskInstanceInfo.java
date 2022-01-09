package com.pis.flatmanager.model.tasks;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaskInstanceInfo {
    UUID id;
    UUID userId;
    UUID completedByUserId;
    @Setter
    TaskInstanceState state;
    LocalDateTime date;
}
