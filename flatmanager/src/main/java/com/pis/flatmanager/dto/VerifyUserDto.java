package com.pis.flatmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyUserDto {

    @NotBlank
    String username;
    @NotBlank
    String password;
}
