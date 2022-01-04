package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;


@Data
public class TaskInstance implements Comparable<TaskInstance> {
    @Id
    UUID id = UUID.randomUUID();

    UUID scheduledUserId;
    UUID completedByUserId;

    @NonNull
    @NotNull
    LocalDateTime dateScheduled;
    LocalDateTime dateCompleted;


    @Override
    public int compareTo(TaskInstance o) {
        return dateScheduled.compareTo(o.dateScheduled);
    }

    public boolean isCompleted() {
        return dateCompleted != null;
    }
}
