package com.pis.flatmanager.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
public class UpdateEmailUserDto {

    @NotBlank
    String id;
    @NotBlank
    String email;
}
