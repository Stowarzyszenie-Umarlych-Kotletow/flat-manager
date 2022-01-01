package com.pis.flatmanager.repository;

import com.pis.flatmanager.model.Flat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FlatRepository extends MongoRepository<Flat, UUID> {
    Optional<Flat> findByName(String name);

}
