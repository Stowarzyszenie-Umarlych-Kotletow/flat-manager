package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.*;
import com.pis.flatmanager.exception.UserDuplicateException;
import com.pis.flatmanager.exception.UserNotFoundException;
import com.pis.flatmanager.model.User;

import java.util.Collection;

public interface UserService {
    User createUser(CreateUserDto userDto) throws UserDuplicateException;
    boolean verifyUser(VerifyUserDto userDto) throws UserNotFoundException;
    User updateUserPassword(UpdatePasswordUserDto userDto) throws UserNotFoundException;
    User updateUserEmail(UpdateEmailUserDto userDto) throws UserNotFoundException;
    void deleteUser(String id) throws UserNotFoundException;
    Collection<User> getUsers();
    User getUser(String id) throws UserNotFoundException;
    User getUserByUsername(String username) throws UserNotFoundException;
    UserDto userToDto(User user);
}
