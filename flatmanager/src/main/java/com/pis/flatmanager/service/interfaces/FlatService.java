package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.flats.*;
import com.pis.flatmanager.exception.*;
import com.pis.flatmanager.model.Flat;
import com.pis.flatmanager.model.FlatUser;
import com.pis.flatmanager.model.Task;
import com.pis.flatmanager.model.User;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface FlatService {
    Flat createFlat(User owner, CreateFlatDto flatDto)
            throws FlatDuplicateException, FlatUnauthorizedException;
    void deleteFlat(User user, String id)
            throws FlatUnauthorizedException, FlatNotFoundException, AccessForbiddenException;
    Flat updateFlatName(User user, String flatId, UpdateNameFlatDto dto)
            throws FlatUnauthorizedException, FlatNotFoundException, FlatDuplicateException, AccessForbiddenException;
    Flat getFlatInfo(User user, String id)
            throws FlatUnauthorizedException, FlatNotFoundException, AccessForbiddenException;
    List<Task> getTasksFromFlat();
    Flat addUserToFlat(User user, String id, AddUserFlatDto dto)
            throws EntityNotFoundException, FlatNotFoundException, FlatUnauthorizedException, FlatServiceException, AccessForbiddenException;
    Flat removeUserFromFlat(User user, String flatId, RemoveUserFlatDto dto)
            throws EntityNotFoundException, FlatNotFoundException, FlatUnauthorizedException, FlatServiceException, AccessForbiddenException;
    FlatDto flatToDto(Flat flat);

    Map<UUID, FlatUser> getUsersFromFlat(String flatId);
}
