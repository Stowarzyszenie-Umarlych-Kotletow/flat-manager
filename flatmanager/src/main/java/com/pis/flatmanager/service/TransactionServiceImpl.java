package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.transactions.CreateTransactionGroupDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.Transaction;
import com.pis.flatmanager.model.TransactionGroup;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.TransactionRepository;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.TransactionService;
import com.pis.flatmanager.service.interfaces.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FlatService flatService;

    @Override
    public TransactionGroup createTransactionGroup(User user, CreateTransactionGroupDto dto) throws AccessForbiddenException {
        if(!flatService.checkIfUserInFlat(dto.getFlatId(), user.getId())) {
            throw new AccessForbiddenException(String.format("User %s does not have access to flat %s", user.getId(), dto.getFlatId()));
        }
        var transactions = dto.getTransactions().stream().map(transaction -> new Transaction(transaction.getName(), transaction.getPrice())).collect(Collectors.toList());
        var transactionGroup = new TransactionGroup(dto.getName(), user.getId(), dto.getFlatId(), transactions, dto.getUsersConnected());
        return transactionRepository.save(transactionGroup);
    }

    @Override
    public void deleteTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException {
        var transactionGroup = transactionRepository.findById(transactionGroupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("TransactionGroup %s does not exist", transactionGroupId)));
        if(!flatService.checkIfUserInFlat(transactionGroup.getFlatId(), user.getId())) {
            throw new AccessForbiddenException(String.format("User %s does not have access to flat %s", user.getId(), transactionGroup.getFlatId()));
        }
        transactionRepository.deleteById(transactionGroupId);
    }

    @Override
    public TransactionGroup getTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException {
        var transactionGroup = transactionRepository.findById(transactionGroupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("TransactionGroup %s does not exist", transactionGroupId)));
        if(!flatService.checkIfUserInFlat(transactionGroup.getFlatId(), user.getId())) {
            throw new AccessForbiddenException(String.format("User %s does not have access to flat %s", user.getId(), transactionGroup.getFlatId()));
        }
        return transactionGroup;
    }

    @Override
    public List<TransactionGroup> getTransactionGroupsByFlatId(User user, UUID flatId) throws AccessForbiddenException {
        if(!flatService.checkIfUserInFlat(flatId, user.getId())) {
            throw new AccessForbiddenException(String.format("User %s does not have access to flat %s", user.getId(), flatId));
        }
        var transactionGroups = transactionRepository.findTransactionGroupsByFlatId(flatId);
        if(transactionGroups.isEmpty()) {
            throw new EntityNotFoundException(String.format("TransactionGroup with flatId %s does not exist", flatId));
        }
        return transactionGroups;
    }
}
