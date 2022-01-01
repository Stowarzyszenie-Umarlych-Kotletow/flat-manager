package com.pis.flatmanager.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.jackson.Jacksonized;

@Jacksonized @Builder
@Getter
public class UserDto {

    String id;
    String firstName;
    String lastName;
    String username;
    String email;


}
