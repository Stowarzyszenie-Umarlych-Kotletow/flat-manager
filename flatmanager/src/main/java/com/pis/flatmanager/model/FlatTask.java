package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.UUID;

@Data
public class FlatTask implements Serializable {
    @Id
    @NonNull
    UUID id;

    @NotBlank
    @NonNull
    String name;

}
