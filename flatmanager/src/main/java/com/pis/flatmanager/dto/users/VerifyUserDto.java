package com.pis.flatmanager.dto.users;

import lombok.Value;

import javax.validation.constraints.NotBlank;

@Value
public class VerifyUserDto {

    @NotBlank
    String username;
    @NotBlank
    String password;
}
