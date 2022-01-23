package com.pis.flatmanager.service;

import com.pis.flatmanager.model.TransactionGroup;
import com.pis.flatmanager.model.transactions.TransactionUserDebt;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class TransactionServiceTest {

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Test
    public void calcOptimizedTransferTest() {
        var u1 = UUID.fromString("10000000-6d23-4d34-a500-cecf955d9903");
        var u2 = UUID.fromString("20000000-6d23-4d34-a500-cecf955d9903");
        var u3 = UUID.fromString("30000000-6d23-4d34-a500-cecf955d9903");

        var debts = List.of(new TransactionUserDebt(u2, BigDecimal.valueOf(1000)),
                new TransactionUserDebt(u2, BigDecimal.valueOf(500)),
                new TransactionUserDebt(u3, BigDecimal.valueOf(2500)));

        var group = new TransactionGroup("test1", u1, UUID.randomUUID(), List.of(), debts, List.of());

        var debts2 = List.of(new TransactionUserDebt(u1, BigDecimal.valueOf(2000)));
        var group2 = new TransactionGroup("test2", u3, UUID.randomUUID(), List.of(), debts2, List.of());


        var result = transactionService.optimizeTransfers(List.of(group, group2));
        assertEquals(2, result.size());
        assertEquals(BigDecimal.valueOf(500), result.get(u3).get(0).getAmount());
        assertEquals(BigDecimal.valueOf(1500), result.get(u2).get(0).getAmount());
    }
}
