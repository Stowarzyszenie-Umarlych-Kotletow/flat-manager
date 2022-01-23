package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.transactions.CreateTransactionGroupDto;
import com.pis.flatmanager.dto.transactions.TransactionGroupDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.User;

import java.util.List;
import java.util.UUID;

public interface TransactionService {

    TransactionGroupDto createTransactionGroup(User user, CreateTransactionGroupDto dto) throws AccessForbiddenException;
    void deleteTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException;
    TransactionGroupDto getTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException;
    List<TransactionGroupDto> getTransactionGroupsByFlatId(User user, UUID flatId) throws AccessForbiddenException;

}
