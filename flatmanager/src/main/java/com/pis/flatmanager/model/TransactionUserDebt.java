package com.pis.flatmanager.model;

import lombok.Value;

import java.math.BigDecimal;
import java.util.UUID;

@Value
public class TransactionUserDebt {
    UUID userId;
    BigDecimal amount;
}
