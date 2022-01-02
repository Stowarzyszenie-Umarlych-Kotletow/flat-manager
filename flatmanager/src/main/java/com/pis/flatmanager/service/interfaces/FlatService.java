package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.flats.*;
import com.pis.flatmanager.exception.*;
import com.pis.flatmanager.model.Flat;
import com.pis.flatmanager.model.FlatUser;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.User;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface FlatService {
    Flat createFlat(User owner, CreateFlatDto flatDto);
    void deleteFlat(User user, String id)
            throws AccessForbiddenException;
    Flat updateFlatName(User user, String flatId, UpdateNameFlatDto dto)
            throws AccessForbiddenException;
    Flat getFlatInfo(User user, String id)
            throws AccessForbiddenException;
    List<FlatTask> getTasksFromFlat();
    Flat addUserToFlat(User user, String id, AddUserFlatDto dto)
            throws EntityNotFoundException, AccessForbiddenException;
    Flat removeUserFromFlat(User user, String flatId, String userId)
            throws EntityNotFoundException, AccessForbiddenException;
    FlatDto flatToDto(Flat flat);

    Map<UUID, FlatUser> getUsersFromFlat(String flatId);
}
