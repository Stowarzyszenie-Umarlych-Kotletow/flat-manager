package com.pis.flatmanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document
public class FlatTaskInstance {
    @Id
    UUID id = UUID.randomUUID();

    UUID completedByUser;

    boolean wasCompleted;

    UUID taskTemplate;
}
