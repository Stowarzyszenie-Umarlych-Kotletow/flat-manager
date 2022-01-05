package com.pis.flatmanager.dto.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEmailUserDto implements Serializable {

    @NotBlank
    @Email
    String email;
}
