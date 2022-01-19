package com.pis.flatmanager.dto.transactions;

import lombok.Value;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Value
public class TransactionDto {
    @NotBlank
    @Size(min = 2, max = 64)
    String name;

    @NotBlank
    @Positive @Digits(integer = 5, fraction = 2)
    BigDecimal price;
}
