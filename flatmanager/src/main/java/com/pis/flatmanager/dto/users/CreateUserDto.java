package com.pis.flatmanager.dto.users;

import lombok.Value;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Value
public class CreateUserDto {

    @NotBlank
    String firstName;
    @NotBlank
    String lastName;
    @NotBlank
    @Size(max=32)
    String username;
    @NotBlank
    @Email
    String email;
    @NotBlank
    @Size(min=8, max=32)
    String password;

}
