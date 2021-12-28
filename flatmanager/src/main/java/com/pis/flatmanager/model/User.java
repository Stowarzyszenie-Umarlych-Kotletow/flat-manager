package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Document(collection="users")
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
    private String username;

    @NonNull
    @NotBlank
    @Email
    private String email;

    private LocalDateTime dateCreated = LocalDateTime.now();

    private String passwordHash;

    private Boolean isActive = false;

    private Boolean isAdmin = false;

}
