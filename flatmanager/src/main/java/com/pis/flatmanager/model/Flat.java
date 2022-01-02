package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
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

    // list of maps with keys {id, role, username} and maybe others
    private Map<UUID, FlatUser> users = new HashMap<>();

    private Map<UUID, FlatTask> tasks = new HashMap<>();
}
