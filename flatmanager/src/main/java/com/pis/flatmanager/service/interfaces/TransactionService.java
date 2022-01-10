package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.transactions.AddTransactionDto;
import com.pis.flatmanager.dto.transactions.CreateTransactionGroupDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.TransactionGroup;
import com.pis.flatmanager.model.User;

import java.util.List;
import java.util.UUID;

public interface TransactionService {

    TransactionGroup createTransactionGroup(User user, UUID flatId, CreateTransactionGroupDto dto) throws AccessForbiddenException;
    void deleteTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException;
    TransactionGroup getTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException;
    List<TransactionGroup> getTransactionsByFlatId(User user, UUID flatId) throws AccessForbiddenException;

    TransactionGroup addTransaction(User user, UUID transactionGroupId, AddTransactionDto dto) throws AccessForbiddenException;
    void removeTransaction(User user, UUID transactionGroupId, UUID transactionId) throws AccessForbiddenException;

}
