package com.pis.flatmanager.dto;

import javax.validation.constraints.Size;

public class UpdatePasswordUserDto {

    public String id;
    @Size(min=8, max=32)
    public String password;
}
