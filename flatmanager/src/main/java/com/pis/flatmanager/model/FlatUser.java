package com.pis.flatmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
public class FlatUser implements Serializable {
    @Id
    UUID id;
    @NotBlank
    String username;

    FlatRole role;

}
