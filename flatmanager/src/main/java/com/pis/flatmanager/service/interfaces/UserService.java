package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.*;
import com.pis.flatmanager.exception.UserServiceException;
import com.pis.flatmanager.model.User;

import java.util.Collection;

public interface UserService {
    User createUser(CreateUserDto userDto) throws UserServiceException;
    boolean verifyUser(VerifyUserDto userDto) throws UserServiceException;
    User updateUserPassword(UpdatePasswordUserDto userDto) throws UserServiceException;
    User updateUserEmail(UpdateEmailUserDto userDto) throws UserServiceException;
    User deleteUser(String id) throws UserServiceException;
    Collection<User> getUsers();
    User getUser(String id) throws UserServiceException;
    User getUserByUsername(String username) throws UserServiceException;
    UserDto userToDto(User user);
}
