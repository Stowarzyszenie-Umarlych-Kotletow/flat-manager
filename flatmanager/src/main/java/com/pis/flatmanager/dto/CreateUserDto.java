package com.pis.flatmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
@AllArgsConstructor
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
