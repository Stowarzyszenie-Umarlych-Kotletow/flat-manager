package com.pis.flatmanager.repository;

import com.pis.flatmanager.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, UUID> {

    Optional<User> findByNickname(String nickname);
}
