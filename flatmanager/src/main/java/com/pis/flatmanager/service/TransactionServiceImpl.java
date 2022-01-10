package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.transactions.AddTransactionDto;
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
        var transactionGroup = new TransactionGroup(dto.getName(), user.getId(), dto.getFlatId());
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

    @Override
    public TransactionGroup addTransaction(User user, UUID transactionGroupId, AddTransactionDto dto) throws AccessForbiddenException {
        var transactionGroup = transactionRepository.findById(transactionGroupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("TransactionGroup %s does not exist", transactionGroupId)));
        if(!flatService.checkIfUserInFlat(transactionGroup.getFlatId(), user.getId())) {
            throw new AccessForbiddenException(String.format("User %s does not have access to flat %s", user.getId(), transactionGroup.getFlatId()));
        }
        var transaction = new Transaction(dto.getTitle(), dto.getValue(), dto.getShares());
        transactionGroup.getTransactions().put(transaction.getId(), transaction);
        return transactionRepository.save(transactionGroup);
    }

    @Override
    public void removeTransaction(User user, UUID transactionGroupId, UUID transactionId) throws AccessForbiddenException {
        var transactionGroup = transactionRepository.findById(transactionGroupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("TransactionGroup %s does not exist", transactionGroupId)));
        if(!flatService.checkIfUserInFlat(transactionGroup.getFlatId(), user.getId())) {
            throw new AccessForbiddenException(String.format("User %s does not have access to flat %s", user.getId(), transactionGroup.getFlatId()));
        }
        if(!transactionGroup.getTransactions().containsKey(transactionId)) {
            throw new EntityNotFoundException(String.format("Transaction %s is not present in group %s", transactionId, transactionGroupId));
        }
        transactionGroup.getTransactions().remove(transactionId);
        transactionRepository.save(transactionGroup);
    }
}
