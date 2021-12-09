package com.pis.flatmanager.dto;

import javax.validation.constraints.Size;

public class CreateUserDto {

    public String firstName;
    public String lastName;
    public String nickname;
    public String email;
    @Size(min=8, max=32)
    public String password;
}
