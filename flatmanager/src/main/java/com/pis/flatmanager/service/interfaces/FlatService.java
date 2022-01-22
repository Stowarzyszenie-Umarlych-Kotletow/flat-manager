package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.flats.AddUserFlatDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.dto.flats.FlatDto;
import com.pis.flatmanager.dto.flats.UpdateNameFlatDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.Flat;
import com.pis.flatmanager.model.FlatTask;
import com.pis.flatmanager.model.FlatUser;
import com.pis.flatmanager.model.User;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface FlatService {
    Flat createFlat(User owner, CreateFlatDto flatDto);
    void deleteFlat(User user, UUID id)
            throws AccessForbiddenException;
    Flat updateFlatName(User user, UUID flatId, UpdateNameFlatDto dto)
            throws AccessForbiddenException;
    Flat updateFlat(Flat flat);
    Flat getFlat(UUID id)
            throws AccessForbiddenException;
    Flat getFlatAsUser(User user, UUID flatId) throws AccessForbiddenException;
    List<FlatTask> getFlatTasks(UUID flatId);
    Flat addUserToFlat(User user, UUID flatId, AddUserFlatDto dto)
            throws EntityNotFoundException, AccessForbiddenException;
    Flat removeUserFromFlat(User user, UUID flatId, UUID userId)
            throws EntityNotFoundException, AccessForbiddenException;
    FlatDto flatToDto(Flat flat);

    Map<UUID, FlatUser> getUsersFromFlat(UUID flatId);
}
