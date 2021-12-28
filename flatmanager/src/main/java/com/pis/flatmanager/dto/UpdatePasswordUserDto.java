package com.pis.flatmanager.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
public class UpdatePasswordUserDto {

    @NotBlank
    String id;
    @NotBlank
    @Size(min=8, max=32)
    String password;
}
