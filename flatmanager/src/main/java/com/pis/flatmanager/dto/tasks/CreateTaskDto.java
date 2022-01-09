package com.pis.flatmanager.dto.tasks;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.time.DurationMin;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskDto implements Serializable {

    @NotBlank
    @Size(max=128)
    String name;

    @NotNull
    LocalDateTime startDate;

    @NotNull
    @DurationMin(minutes = 5)
    Duration timeToComplete;

    Duration repeatAfter;

    LocalDateTime endDate;

    String description;

    List<UUID> userIds = new ArrayList<>();

}
