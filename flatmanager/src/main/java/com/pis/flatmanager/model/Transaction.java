package com.pis.flatmanager.model;

import nonapi.io.github.classgraph.json.Id;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

public class Transaction implements Serializable {
    @Id
    private UUID id;

    @NotNull
    private String title;

    @NotNull
    private BigDecimal value;

    Map<UUID, BigDecimal> userShares;


}
