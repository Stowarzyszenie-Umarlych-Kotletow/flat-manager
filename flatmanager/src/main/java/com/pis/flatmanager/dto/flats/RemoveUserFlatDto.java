package com.pis.flatmanager.dto.flats;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Value
public class RemoveUserFlatDto {

    @NotBlank
    String userId;
}
