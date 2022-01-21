package com.pis.flatmanager.dto.users;

import lombok.Value;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Value
public class UpdateEmailUserDto implements Serializable {

    @NotBlank
    @Email
    String email;
}
