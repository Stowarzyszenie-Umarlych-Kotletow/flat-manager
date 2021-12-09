package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
public class User implements Serializable {

    @Id
    private UUID id = UUID.randomUUID();

    @NonNull
    @NotBlank
    private String firstName;

    @NonNull
    @NotBlank
    private String lastName;

    @NonNull
    @NotBlank
    private String nickname;

    @NonNull
    @NotBlank
    @Email
    private String email;

    private String passwordHash;

    private Boolean isActive = false;

    private Boolean isAdmin = false;

}
