package com.pis.flatmanager.repository;

import com.pis.flatmanager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TaskRepository extends MongoRepository<Task, UUID> {
}
