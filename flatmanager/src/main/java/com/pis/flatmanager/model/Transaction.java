package com.pis.flatmanager.model;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class Transaction implements Serializable {

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private BigDecimal price;

}
