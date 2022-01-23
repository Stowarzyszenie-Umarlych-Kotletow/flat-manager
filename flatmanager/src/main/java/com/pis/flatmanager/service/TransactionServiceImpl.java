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
import com.pis.flatmanager.dto.transactions.TransactionGroupDto;
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
    public TransactionGroupDto createTransactionGroup(User user, CreateTransactionGroupDto dto) throws AccessForbiddenException {
        flatService.getFlatAsUser(user, dto.getFlatId());
        var transactions = dto.getTransactions().stream().map(transaction -> new Transaction(transaction.getName(), transaction.getPrice())).collect(Collectors.toList());
        var transactionGroup = new TransactionGroup(dto.getName(), user.getId(), dto.getFlatId(), transactions, dto.getUsersConnected());
        return transactionRepository.save(transactionGroup).asDto();
    }

    @Override
    public void deleteTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException {
        getTransactionGroup(user, transactionGroupId);
        transactionRepository.deleteById(transactionGroupId);
    }

    @Override
    public TransactionGroupDto getTransactionGroup(User user, UUID transactionGroupId) throws AccessForbiddenException {
        var transactionGroup = transactionRepository.findById(transactionGroupId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("TransactionGroup %s does not exist", transactionGroupId)));
        flatService.getFlatAsUser(user, transactionGroup.getFlatId());
        return transactionGroup.asDto();
    }

    @Override
    public List<TransactionGroupDto> getTransactionGroupsByFlatId(User user, UUID flatId) throws AccessForbiddenException {
        flatService.getFlatAsUser(user, flatId);
        var transactionGroups = transactionRepository.findTransactionGroupsByFlatId(flatId);
        return transactionGroups.stream().map(TransactionGroup::asDto).collect(Collectors.toList());
    }

}
