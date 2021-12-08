package com.pis.flatmanager.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
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

    @NonNull
    private String passwordHash;

    private Boolean isAdmin = false;

}
