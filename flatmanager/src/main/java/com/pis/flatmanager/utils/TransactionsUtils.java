package com.pis.flatmanager.utils;

import com.pis.flatmanager.model.transactions.MinMaxValue;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Map;

public class TransactionsUtils {

    private TransactionsUtils() {

    }

    public static <T> MinMaxValue<T> getMinMax(Collection<Map.Entry<T, BigDecimal>> decimals) {
        var min = BigDecimal.ZERO;
        var max = BigDecimal.ZERO;
        T minObj = null;
        T maxObj = null;
        for (var kv : decimals) {
            var key = kv.getKey();
            var value = kv.getValue();
            if (value.compareTo(max) > 0) {
                max = value;
                maxObj = key;
            }
            if (value.compareTo(min) < 0) {
                min = value;
                minObj = key;
            }
        }
        return new MinMaxValue<>(minObj, min, maxObj, max);
    }
}
