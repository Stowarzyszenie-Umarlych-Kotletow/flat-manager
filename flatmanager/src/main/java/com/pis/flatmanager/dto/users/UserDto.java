package com.pis.flatmanager.dto.users;

import com.pis.flatmanager.model.UserFlat;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Builder
@Value
public class UserDto {

    String id;
    String firstName;
    String lastName;
    String username;
    String email;
    List<UserFlat> flats;


}
