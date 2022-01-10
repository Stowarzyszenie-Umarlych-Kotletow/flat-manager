package com.pis.flatmanager.repository;

import com.pis.flatmanager.model.TransactionGroup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends MongoRepository<TransactionGroup, UUID> {
    List<TransactionGroup> findTransactionGroupsByFlatId(UUID flatId);
}
