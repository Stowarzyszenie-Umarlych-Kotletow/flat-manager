package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Data
@Document(collection = "transaction_groups")
public class TransactionGroup implements Serializable {

    @Id
    private UUID id = UUID.randomUUID();

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private UUID createdBy;

    @NotNull
    @NonNull
    private UUID flatId;

    private Map<UUID, Transaction> transactions;

    @CreatedDate
    private LocalDateTime dateCreated;

    @LastModifiedDate
    private LocalDateTime lastModified;



}
