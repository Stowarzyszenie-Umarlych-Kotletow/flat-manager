package com.pis.flatmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import nonapi.io.github.classgraph.json.Id;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFlat implements Serializable {

    @Id
    @NonNull
    private UUID id;

    @NonNull
    private String name;
}
