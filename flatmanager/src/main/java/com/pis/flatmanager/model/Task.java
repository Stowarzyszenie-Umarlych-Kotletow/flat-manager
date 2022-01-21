package com.pis.flatmanager.model;

import com.pis.flatmanager.dto.tasks.TaskDto;
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
    private UUID id = UUID.randomUUID();

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

    Set<TaskInstance> instances = new TreeSet<>();

    @NotNull
    @NonNull
    LocalDateTime startDate;

    LocalDateTime endDate;

    @NotNull
    @NonNull
    Duration timeToComplete;

    Duration repeatAfter;

    public boolean canScheduleAt(LocalDateTime date) {
        if (repeatAfter == null) {
            return date.equals(startDate);
        }
        return date.isAfter(startDate) && (endDate == null || endDate.isAfter(date));
    }

    public TaskDto asDto() {
        return TaskDto.builder().id(getId()).flatId(getFlatId()).name(getName()).ownerId(getOwnerId()).description(getDescription())
                .userDoneCounter(getUserDoneCounter()).startDate(getStartDate()).endDate(getEndDate()).timeToComplete(getTimeToComplete())
                .repeatAfter(getRepeatAfter()).build();
    }
}
