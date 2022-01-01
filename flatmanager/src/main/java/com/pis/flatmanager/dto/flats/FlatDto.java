package com.pis.flatmanager.dto.flats;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class FlatDto {
    String id;

    String name;

    List<?> users;
}
