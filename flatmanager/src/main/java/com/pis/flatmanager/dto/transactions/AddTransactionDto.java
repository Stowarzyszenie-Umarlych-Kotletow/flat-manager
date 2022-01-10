package com.pis.flatmanager.dto.transactions;

import lombok.Value;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Value
public class AddTransactionDto {

    @NotBlank
    @Size(min = 2, max = 64)
    String title;

    @NotBlank
    @Positive @Digits(integer = 5, fraction = 2)
    BigDecimal value;

    @NotBlank
    Map<UUID, BigDecimal> shares;

}
