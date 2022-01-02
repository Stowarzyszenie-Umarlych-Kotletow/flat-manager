package com.pis.flatmanager.dto.tasks;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.io.Serializable;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTaskDto implements Serializable {

    @Size(max=128)
    String name;
    String startDate;
    String endDate;
    Integer timeToComplete;
    Integer repeatAfter;
    String description;
}
