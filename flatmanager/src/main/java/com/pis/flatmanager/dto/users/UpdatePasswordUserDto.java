package com.pis.flatmanager.dto.users;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Value
public class UpdatePasswordUserDto {

    @NotBlank
    @Size(min=8, max=32)
    String password;
}
