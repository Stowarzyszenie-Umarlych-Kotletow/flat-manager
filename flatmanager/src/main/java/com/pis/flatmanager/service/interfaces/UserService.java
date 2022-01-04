package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UserDto;
import com.pis.flatmanager.dto.VerifyUserDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityDuplicateException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.model.UserFlat;

import java.util.Collection;
import java.util.UUID;

public interface UserService {
    User createUser(CreateUserDto userDto) throws EntityDuplicateException;
    boolean verifyUser(VerifyUserDto userDto) throws EntityNotFoundException;
    User updateUserPassword(User user, String newPassword);
    User updateUserEmail(User user, String newEmail);
    User addUserFlat(User user, UserFlat flat);
    User removeUserFlat(User user, UUID flatId);
    User updateUserFlat(User user, UserFlat flat);
    void deleteUser(UUID userId) throws EntityNotFoundException;
    Collection<User> getUsers();
    User getUser(UUID userId) throws EntityNotFoundException;
    User getUserByUsername(String username) throws EntityNotFoundException;
    User getCurrentUser() throws EntityNotFoundException, AccessForbiddenException;
    void deleteAllUsers();
    UserDto userToDto(User user);
}
