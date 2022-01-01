package com.pis.flatmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class FlatUser {

    UUID userId;

    String username;

    FlatRole role;

}
