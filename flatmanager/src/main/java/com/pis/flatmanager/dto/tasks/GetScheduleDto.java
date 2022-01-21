package com.pis.flatmanager.dto.tasks;

import lombok.Value;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;


@Value
public class GetScheduleDto implements Serializable {
    LocalDateTime from;
    @NotNull
    LocalDateTime until;
}
