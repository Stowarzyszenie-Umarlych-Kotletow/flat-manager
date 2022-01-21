package com.pis.flatmanager.dto.flats;

import com.pis.flatmanager.model.FlatUser;
import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Builder
@Value
public class FlatDto {
    UUID id;

    String name;

    List<FlatUser> users;
}
