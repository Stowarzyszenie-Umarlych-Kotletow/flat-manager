package com.pis.flatmanager.dto.tasks;

import lombok.*;

import javax.validation.constraints.Size;
import java.io.Serializable;

@Builder
@Value
public class UpdateTaskDto implements Serializable {

    @Size(max=128)
    String name;
    String startDate;
    String endDate;
    Integer timeToComplete;
    Integer repeatAfter;
    String description;
}
