package com.pis.flatmanager.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
public class ValidatePasswordDto {

    @NotBlank
    String password;

}
