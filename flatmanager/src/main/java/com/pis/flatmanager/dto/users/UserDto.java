package com.pis.flatmanager.dto.users;

import com.pis.flatmanager.model.UserFlat;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Jacksonized @Builder
@Getter
public class UserDto {

    String id;
    String firstName;
    String lastName;
    String username;
    String email;
    List<UserFlat> flats;


}
