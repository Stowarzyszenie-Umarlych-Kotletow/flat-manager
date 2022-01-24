package com.pis.flatmanager.model.transactions;

import lombok.Setter;
import lombok.Value;

import java.math.BigDecimal;

@Value
@Setter
public class MinMaxValue<T> {
    T minObj;
    BigDecimal min;
    T maxObj;
    BigDecimal max;
}
