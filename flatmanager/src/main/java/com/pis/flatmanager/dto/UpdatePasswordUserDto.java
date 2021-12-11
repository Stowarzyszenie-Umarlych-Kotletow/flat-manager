package com.pis.flatmanager.dto;

import lombok.Builder;

import javax.validation.constraints.Size;

@Builder
public class UpdatePasswordUserDto {

    public String id;
    @Size(min=8, max=32)
    public String password;
}
