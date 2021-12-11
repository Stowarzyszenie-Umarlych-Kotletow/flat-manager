package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.UserDto;
import com.pis.flatmanager.exception.UserServiceException;
import com.pis.flatmanager.model.User;

import java.util.Collection;

public interface UserService {
    User createUser(CreateUserDto userDto);
    void updateUserPassword(UpdatePasswordUserDto userDto) throws UserServiceException;
    void updateUserEmail(UpdateEmailUserDto userDto) throws UserServiceException;
    void deleteUser(String id) throws UserServiceException;
    Collection<UserDto> getUsers();
    User getUser(String id) throws UserServiceException;
}
