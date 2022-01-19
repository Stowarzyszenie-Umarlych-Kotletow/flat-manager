package com.pis.flatmanager.dto.transactions;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.UUID;

@Value
public class CreateTransactionGroupDto {
    @NotBlank
    @Size(min = 2, max=64)
    String name;

    @NotNull
    UUID flatId;

    @NotNull
    List<TransactionDto> transactions;

    @NotNull
    List<UUID> usersConnected;
}
