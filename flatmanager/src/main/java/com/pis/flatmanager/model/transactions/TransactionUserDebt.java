package com.pis.flatmanager.model.transactions;

import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.UUID;

@Value
public class TransactionUserDebt implements Serializable {
    UUID userId;
    BigDecimal amount;
}
