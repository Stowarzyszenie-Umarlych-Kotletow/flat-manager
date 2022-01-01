package com.pis.flatmanager.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.annotation.Id;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

@Data
@Document(collection = "flats")
public class Flat implements Serializable {

    @Id
    private UUID id = UUID.randomUUID();

    @NonNull
    @NotBlank
    private String name;

    @NotBlank
    @NonNull
    private FlatUser owner;

    private LocalDateTime dateCreated = LocalDateTime.now();

    // list of maps with keys {id, role, username} and maybe others
    private Map<UUID, FlatUser> users = new HashMap<>();

    // list of references with names (no reason embed task data to flat document)
    private List<Map.Entry<UUID, String>> tasks = new ArrayList<>();
}
