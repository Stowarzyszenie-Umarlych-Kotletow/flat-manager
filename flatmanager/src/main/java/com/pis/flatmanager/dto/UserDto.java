package com.pis.flatmanager.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserDto {

    String id;
    String firstName;
    String lastName;
    String username;
    String email;


}
