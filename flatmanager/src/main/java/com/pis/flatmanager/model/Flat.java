package com.pis.flatmanager.model;

import com.pis.flatmanager.model.transactions.TransactionUserDebt;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Document(collection = "flats")
public class Flat implements Serializable {

    @Id
    private UUID id = UUID.randomUUID();

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private FlatUser owner;


    private LocalDateTime dateCreated = LocalDateTime.now();

    // flat users by their user ids
    private Map<UUID, FlatUser> users = new HashMap<>();
    // flat tasks by their task ids
    private Map<UUID, FlatTask> tasks = new HashMap<>();
    // list of debts by their user ids
    private Map<UUID, List<TransactionUserDebt>> optimizedTransfers = new HashMap<>();

    @Version
    private Long version;
}
