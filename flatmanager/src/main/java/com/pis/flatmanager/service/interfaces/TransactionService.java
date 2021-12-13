package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.model.Transaction;

public interface TransactionService {

    Transaction createTransaction();
    void deleteTransaction();
    Transaction getTransaction();
    Transaction updateTransaction();
}
