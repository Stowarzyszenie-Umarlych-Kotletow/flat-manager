package com.pis.flatmanager.dto.transactions;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Value
public class CreateTransactionGroupDto {
    @NotBlank
    @Size(min = 2, max=64)
    String name;
}
