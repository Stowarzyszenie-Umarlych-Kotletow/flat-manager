package com.pis.flatmanager.dto.flats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateNameFlatDto {

    @NotBlank
    @Size(min=2, max=32)
    String name;
}
