package com.pis.flatmanager.dto.flats;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Value
public class CreateFlatDto {
    @NotBlank
    @Size(min=2, max=32)
    String name;
}
