package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Data
public class Transaction implements Serializable {
    @Id
    private UUID id = UUID.randomUUID();

    @NotNull
    @NonNull
    private String title;

    @NotNull
    @NonNull
    private BigDecimal value;

    @NotNull
    @NonNull
    private Map<UUID, BigDecimal> userShares;

}
