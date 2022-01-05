package com.pis.flatmanager.dto.flats;

import com.pis.flatmanager.model.FlatRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddUserFlatDto {

    @NotNull
    UUID userId;

    @NotNull
    FlatRole role = FlatRole.USER;
}
