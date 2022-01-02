package com.pis.flatmanager.dto.tasks;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskDto implements Serializable {

    @NotBlank
    @Size(max=128)
    String name;
    @NotBlank
    LocalDateTime startDate;
    @NotNull
    Duration timeToComplete;
    @NotNull
    Duration repeatAfter;

    LocalDateTime endDate;

    String description;

}
