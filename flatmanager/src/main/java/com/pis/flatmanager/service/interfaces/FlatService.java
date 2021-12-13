package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.model.Flat;
import com.pis.flatmanager.model.Task;

import java.util.List;

public interface FlatService {
    Flat createFlat();
    void deleteFlat();
    Flat updateFlatName();
    Flat getFlatInfo();
    List<Task> getTasksFromFlat();
    Flat addUserToFlat();
    Flat removeUserFromFlat();
}
