package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.model.Task;

public interface TaskService {
    Task createTask();
    void deleteTask();
    Task addUserToTask();
    Task removeUserFromTask();
    Task getTask();
    Task updateTask();
}
