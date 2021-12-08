package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Data
public class User implements Serializable {

    @Id
    private UUID id = UUID.randomUUID();

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    @NonNull
    private String nickname;

    @NonNull
    private String email;

    @NonNull
    private String passwordHash;

    @NonNull
    private Boolean isAdmin;

}
