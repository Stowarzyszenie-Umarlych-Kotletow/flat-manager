package com.pis.flatmanager.model;

import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TransactionGroup implements Serializable {

    @Id
    private UUID id;

    @NotNull
    private String name;

    @NotNull
    private UUID createdBy;

    private List<Transaction> transactions;

    @CreatedDate
    private LocalDateTime dateCreated;

    @LastModifiedDate
    private LocalDateTime lastModified;



}
