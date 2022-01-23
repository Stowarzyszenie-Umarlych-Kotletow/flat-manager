package com.pis.flatmanager.dto.transactions;

import com.pis.flatmanager.model.Transaction;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Value
public class TransactionGroupDto implements Serializable {
    UUID id;

    String name;

    UUID createdBy;

    UUID flatId;

    List<Transaction> transactions;

    List<UUID> usersConnected;

    LocalDateTime dateCreated;

    String sumOfTransactions;
}
