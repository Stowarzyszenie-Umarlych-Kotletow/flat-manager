package com.pis.flatmanager.dto.flats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddUserFlatDto {

    @NotBlank
    UUID userId;

    // available roles: user, owner
    @NotBlank
    String role = "user";
}
