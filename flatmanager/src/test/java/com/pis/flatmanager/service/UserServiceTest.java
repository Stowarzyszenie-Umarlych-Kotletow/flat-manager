package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.users.CreateUserDto;
import com.pis.flatmanager.dto.users.UpdateEmailUserDto;
import com.pis.flatmanager.dto.users.UpdatePasswordUserDto;
import com.pis.flatmanager.dto.users.VerifyUserDto;
import com.pis.flatmanager.exception.EntityDuplicateException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.UserRepository;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.Validator;
import java.util.Optional;
import java.util.Set;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    Validator validator;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void mockPasswordEncoder() {
        when(passwordEncoder.encode(any(String.class)))
                .thenReturn(String.valueOf((Answer<String>) invocation -> {
            Object[] args = invocation.getArguments();
            return (String) args[0];
        }));
    }

    @BeforeEach
    void mockValidator() {
        when(validator.validate(any())).thenReturn(Set.of());
    }

    @Test
    public void createUserTest() throws EntityDuplicateException {
        var createUserDto = getTestCreateUserDto();

        when(userRepository.save(any())).thenReturn(null);
        User user = userService.createUser(createUserDto);
        assertEquals(user.getFirstName(), createUserDto.getFirstName());
        assertEquals(user.getLastName(), createUserDto.getLastName());
        assertEquals(user.getUsername(), createUserDto.getUsername());
        assertEquals(user.getEmail(), createUserDto.getEmail());
    }

    @Test
    public void createUserWithDuplicateTest() {
        var createUserDto = getTestCreateUserDto();
        var user = new User(
                createUserDto.getFirstName(),
                createUserDto.getLastName(),
                createUserDto.getUsername(),
                createUserDto.getEmail()
        );

        when(userRepository.findByUsername(createUserDto.getUsername())).thenReturn(Optional.of(user));
        assertThrows(EntityDuplicateException.class, () -> userService.createUser(createUserDto));
    }

    @Test
    public void updatePasswordUserTest() throws EntityNotFoundException, EntityDuplicateException {

        var createUserDto = getTestCreateUserDto();

        User createdUser = userService.createUser(createUserDto);

        var updatePasswordUserDto = new UpdatePasswordUserDto("testtest321");
        when(userRepository.findById(any())).thenReturn(Optional.of(createdUser));
        userService.updateUserPassword(createdUser, updatePasswordUserDto.getPassword());
        var user = userService.getUser(createdUser.getId());

        assertEquals(passwordEncoder.encode(updatePasswordUserDto.getPassword()), user.getPasswordHash());
    }

    @Test
    public void updateEmailUserTest() throws EntityDuplicateException, EntityNotFoundException {
        var createUserDto = getTestCreateUserDto();

        User createdUser = userService.createUser(createUserDto);

        var updateEmailUserDto = new UpdateEmailUserDto("test@test.eu");
        when(userRepository.findById(any())).thenReturn(Optional.of(createdUser));
        userService.updateUserEmail(createdUser, updateEmailUserDto.getEmail());
        var user = userService.getUser(createdUser.getId());

        assertEquals(updateEmailUserDto.getEmail(), user.getEmail());
    }

    @Test
    public void deleteUserTest() throws EntityDuplicateException {
        var createUserDto = getTestCreateUserDto();

        User createdUser = userService.createUser(createUserDto);
        when(userRepository.findById(any())).thenReturn(Optional.of(createdUser));

        userService.deleteUser(createdUser.getId());
    }

    @Test
    public void deleteUserWithoutUserTest() {
        var createUserDto = getTestCreateUserDto();
        User createdUser = userService.createUser(createUserDto);
        when(userRepository.findById(createdUser.getId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> userService.deleteUser(createdUser.getId()));
    }

    @Test
    public void deleteAllUsersTest() {
        var createUserDto = getTestCreateUserDto();
        userService.createUser(createUserDto);
        userService.deleteAllUsers();
    }

    @Test
    public void verifyUserTest() {
        var verifyUserDto = new VerifyUserDto("test", "testtest123");
        var createUserDto = getTestCreateUserDto();
        User createdUser = userService.createUser(createUserDto);

        when(userRepository.findByUsername(createdUser.getUsername())).thenReturn(Optional.of(createdUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);

        assertTrue(userService.verifyUser(verifyUserDto));
    }

    @Test
    public void verifyUserNotVerifiedTest() {
        var verifyUserDto = new VerifyUserDto("test", "testtest123");
        var createUserDto = getTestCreateUserDto();
        User createdUser = userService.createUser(createUserDto);

        when(userRepository.findByUsername(createdUser.getUsername())).thenReturn(Optional.of(createdUser));
        when(passwordEncoder.matches(any(), any())).thenReturn(false);

        assertFalse(userService.verifyUser(verifyUserDto));
    }

    @Test
    public void verifyUserNotFoundTest() {
        var verifyUserDto = new VerifyUserDto("test", "testtest123");
        var createUserDto = getTestCreateUserDto();
        User createdUser = userService.createUser(createUserDto);

        when(userRepository.findByUsername(createdUser.getUsername())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.verifyUser(verifyUserDto));
    }


    @Test
    public void userToDtoTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var dto = userService.userToDto(user);
        assertEquals(user.getId().toString(), dto.getId());
        assertEquals(user.getFirstName(), dto.getFirstName());
        assertEquals(user.getLastName(), dto.getLastName());
        assertEquals(user.getUsername(), dto.getUsername());
        assertEquals(user.getEmail(), dto.getEmail());
    }

    private CreateUserDto getTestCreateUserDto() {
        return new CreateUserDto("test", "test", "test", "test@test.com", "testtest123");
    }
}
