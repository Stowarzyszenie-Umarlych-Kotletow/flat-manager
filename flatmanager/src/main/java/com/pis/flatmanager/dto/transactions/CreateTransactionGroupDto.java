package com.pis.flatmanager.dto.transactions;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Value
public class CreateTransactionGroupDto {
    @NotBlank
    @Size(min = 2, max=64)
    String name;

    @NotBlank UUID flatId;
}
