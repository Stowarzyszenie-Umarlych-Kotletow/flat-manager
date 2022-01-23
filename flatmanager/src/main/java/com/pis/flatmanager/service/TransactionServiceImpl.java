package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.transactions.CreateTransactionGroupDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.*;
import com.pis.flatmanager.repository.TransactionRepository;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.TransactionService;
import com.pis.flatmanager.service.interfaces.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
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

    private <T> MinMaxValue<T> _getMinMax(Collection<Map.Entry<T, BigDecimal>> decimals) {
        var min = BigDecimal.ZERO;
        var max = BigDecimal.ZERO;
        T minObj = null;
        T maxObj = null;
        for(var kv : decimals) {
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
        return new MinMaxValue<T>(minObj, min, maxObj, max);
    }

    public Map<UUID, List<TransactionUserDebt>> optimizeTransfers(List<TransactionGroup> groups) {
        var resultMap = new HashMap<UUID, List<TransactionUserDebt>>();
        var debtMap = new HashMap<UUID, BigDecimal>();
        for (var group : groups) {
            var sum = BigDecimal.ZERO;
            for (var debt : group.getUserDebts()) {
                sum = sum.add(debt.getAmount());
                debtMap.merge(debt.getUserId(), debt.getAmount().negate(), BigDecimal::add);
            }
            debtMap.merge(group.getCreatedBy(), sum, BigDecimal::add);
        }

        var previousSum = BigDecimal.ZERO;
        while (true) {
            var sum = debtMap.values().stream().map(BigDecimal::abs).reduce(BigDecimal.ZERO, BigDecimal::add);
            if (sum.equals(previousSum) || sum.equals(BigDecimal.ZERO)) {
                break;
            }
            previousSum = sum;
            // max: credit
            // min: debit
            var values = _getMinMax(debtMap.entrySet());
            var creditee = values.getMaxObj();
            var debitee = values.getMinObj();
            var transfer = values.getMin().negate().min(values.getMax());
            // update money left to pay
            debtMap.merge(creditee, transfer.negate(), BigDecimal::add);
            debtMap.merge(debitee, transfer, BigDecimal::add);
            // debitee -> creditee
            resultMap.computeIfAbsent(debitee, k -> new ArrayList<>()).add(new TransactionUserDebt(creditee, transfer));
        }
        return resultMap;
    }

    public List<TransactionUserDebt> splitTransaction(List<UUID> users, List<Transaction> transactions) {
        var total = transactions.stream().map(Transaction::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);
        var perUser = total.divide(BigDecimal.valueOf(users.size())).setScale(2, RoundingMode.FLOOR);
        return users.stream().map(u -> new TransactionUserDebt(u, perUser)).collect(Collectors.toList());
    }

    public void updateTransfersInFlat(UUID flatId) throws AccessForbiddenException {
        var flat =  flatService.getFlat(flatId);
        var transactions = transactionRepository.findTransactionGroupsByFlatId(flatId);
        flat.setOptimizedTransfers(optimizeTransfers(transactions));
        flatService.updateFlat(flat);
    }


    @Override
    public TransactionGroup createTransactionGroup(User user, CreateTransactionGroupDto dto) throws AccessForbiddenException {
        flatService.getFlatAsUser(user, dto.getFlatId());
        var transactions = dto.getTransactions().stream().map(transaction -> new Transaction(transaction.getName(), transaction.getPrice())).collect(Collectors.toList());
        var debts = splitTransaction(dto.getUsersConnected(), transactions);
        var transactionGroup = new TransactionGroup(dto.getName(), user.getId(), dto.getFlatId(), transactions, debts, dto.getUsersConnected());
        var obj = transactionRepository.save(transactionGroup);
        updateTransfersInFlat(dto.getFlatId());
        return obj;
    }

    @Override
    public void deleteTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException {
        getTransactionGroup(user, transactionGroupId);
        transactionRepository.deleteById(transactionGroupId);
    }

    @Override
    public TransactionGroup getTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException {
        var transactionGroup = transactionRepository.findById(transactionGroupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("TransactionGroup %s does not exist", transactionGroupId)));
        flatService.getFlatAsUser(user, transactionGroup.getFlatId());
        return transactionGroup;
    }

    @Override
    public List<TransactionGroup> getTransactionGroupsByFlatId(User user, UUID flatId) throws AccessForbiddenException {
        flatService.getFlatAsUser(user, flatId);
        return transactionRepository.findTransactionGroupsByFlatId(flatId);
    }

}
