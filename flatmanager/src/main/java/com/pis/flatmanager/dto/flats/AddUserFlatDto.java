package com.pis.flatmanager.dto.flats;

import com.pis.flatmanager.model.FlatRole;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
@Value
public class AddUserFlatDto {

    @NotNull
    UUID userId;

    @NotNull
    FlatRole role;
}
