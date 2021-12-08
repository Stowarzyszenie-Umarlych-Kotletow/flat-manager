package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.CreateUserDto;
import com.pis.flatmanager.dto.UpdateEmailUserDto;
import com.pis.flatmanager.dto.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.UserDto;
import com.pis.flatmanager.model.User;

import java.util.Collection;

public interface UserService {
    User createUser(CreateUserDto userDto);
    void updateUserPassword(UpdatePasswordUserDto userDto);
    void updateUserEmail(UpdateEmailUserDto userDto);
    void deleteUser(String id);
    Collection<UserDto> getUsers();
}
