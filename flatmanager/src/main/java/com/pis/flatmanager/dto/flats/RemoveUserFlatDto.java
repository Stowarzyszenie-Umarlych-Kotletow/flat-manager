package com.pis.flatmanager.dto.flats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RemoveUserFlatDto {

    @NotBlank
    String userId;
}
