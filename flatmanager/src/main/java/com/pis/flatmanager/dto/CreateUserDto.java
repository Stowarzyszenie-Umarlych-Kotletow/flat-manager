package com.pis.flatmanager.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
public class CreateUserDto {

    @NotBlank
    String firstName;
    @NotBlank
    String lastName;
    @NotBlank
    String username;
    @NotBlank
    @Email
    String email;
    @NotBlank
    @Size(min=8, max=32)
    String password;
}
