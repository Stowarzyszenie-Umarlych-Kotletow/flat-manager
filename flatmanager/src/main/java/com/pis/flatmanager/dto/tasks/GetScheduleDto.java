package com.pis.flatmanager.dto.tasks;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetScheduleDto implements Serializable {
    LocalDateTime from;
    @NotNull
    LocalDateTime until;
}
