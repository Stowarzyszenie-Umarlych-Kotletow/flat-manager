package com.pis.flatmanager.service;


import com.pis.flatmanager.dto.flats.AddUserFlatDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.dto.flats.UpdateNameFlatDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityDuplicateException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.Flat;
import com.pis.flatmanager.model.FlatRole;
import com.pis.flatmanager.model.FlatUser;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.repository.FlatRepository;
import com.pis.flatmanager.service.interfaces.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class FlatServiceTest {

    @Mock
    FlatRepository flatRepository;

    @InjectMocks
    private FlatServiceImpl flatService;

    @Mock
    private UserService userService;

    @Test
    public void createFlatTest() {
        var user = new User("test", "test", "test", "test@test.com");
        when(flatRepository.findByName(any())).thenReturn(Optional.empty());

        var flat = flatService.createFlat(user, new CreateFlatDto(
                "testFlat"
        ));

        assertEquals("testFlat", flat.getName());
        assertEquals(user.getId(), flat.getOwner().getUserId());
        assertEquals(user.getUsername(), flat.getOwner().getUsername());
        assertEquals(FlatRole.OWNER, flat.getOwner().getRole());
    }

    @Test
    public void createFlatWithDuplicateNameTest() {
        var user = new User("test", "test", "test", "test@test.com");
        when(flatRepository.findByName(any())).thenReturn(Optional.of(new Flat("testFlat", new FlatUser(UUID.randomUUID(), "test", FlatRole.OWNER))));

        assertThrows(EntityDuplicateException.class, () -> flatService.createFlat(user, new CreateFlatDto("testFlat")));
    }

    @Test
    public void deleteFlatTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));
        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        flatService.deleteFlat(user, flat.getId().toString());

        verify(flatRepository, times(1)).deleteById(any());
    }

    @Test
    public void deleteFlatNotFoundTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));
        when(flatRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> flatService.deleteFlat(user, flat.getId().toString()));
        verify(flatRepository, times(0)).deleteById(any());
    }

    @Test
    public void deleteFlatForbiddenTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                UUID.randomUUID(), user.getUsername(), FlatRole.OWNER
        ));
        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));

        assertThrows(AccessForbiddenException.class, () -> flatService.deleteFlat(user, flat.getId().toString()));
        verify(flatRepository, times(0)).deleteById(any());
    }

    @Test
    public void updateFlatNameTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new UpdateNameFlatDto("testFlat2");

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(flatRepository.findByName(any())).thenReturn(Optional.empty());

        var flatAfterChanges = flatService.updateFlatName(user, flat.getId().toString(), dto);

        assertEquals(flatAfterChanges.getName(), dto.getName());
        assertEquals(flatAfterChanges.getId(), flat.getId());
        assertEquals(flatAfterChanges.getOwner().getUserId(), flat.getOwner().getUserId());
    }

    @Test
    public void updateFlatNameNotFoundTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new UpdateNameFlatDto("testFlat2");

        when(flatRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> flatService.updateFlatName(user, flat.getId().toString(), dto));
    }

    @Test
    public void updateFlatNameDuplicateTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new UpdateNameFlatDto("testFlat2");

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(flatRepository.findByName(any())).thenReturn(Optional.of(flat));

        assertThrows(EntityDuplicateException.class, () -> flatService.updateFlatName(user, flat.getId().toString(), dto));
    }

    @Test
    public void updateFlatNameAccessForbiddenTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                UUID.randomUUID(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new UpdateNameFlatDto("testFlat2");

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(flatRepository.findByName(any())).thenReturn(Optional.empty());

        assertThrows(AccessForbiddenException.class, () -> flatService.updateFlatName(user, flat.getId().toString(), dto));
    }

    @Test
    public void getFlatInfoByOwnerTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        var recFlat = flatService.getFlatInfo(user, flat.getId().toString());
        assertEquals(recFlat.getId(), flat.getId());
    }

    @Test
    public void getFlatInfoNotFoundTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> flatService.getFlatInfo(user, flat.getId().toString()));

    }

    @Test
    public void getFlatInfoFromUserTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        var recFlat = flatService.getFlatInfo(user2, flat.getId().toString());
        assertEquals(recFlat.getId(), flat.getId());
    }

    @Test
    public void getFlatInfoAccessForbiddenFromOwnerTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                UUID.randomUUID(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        assertThrows(AccessForbiddenException.class, () -> flatService.getFlatInfo(user, flat.getId().toString()));
    }

    @Test
    public void getFlatInfoAccessForbiddenFromUserTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var id = UUID.randomUUID();
        flat.getUsers().put(id, new FlatUser(id, user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        assertThrows(AccessForbiddenException.class, () -> flatService.getFlatInfo(user2, flat.getId().toString()));
    }

    @Test
    public void addUserToFlatTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new AddUserFlatDto(
                user2.getId().toString(), "USER"
        );

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        var flatAfterChanges = flatService.addUserToFlat(user, flat.getId().toString(), dto);

        assertTrue(flatAfterChanges.getUsers().containsKey(user2.getId()));
        assertEquals(flatAfterChanges.getUsers().get(user2.getId()).getUsername(), user2.getUsername());
        assertEquals(FlatRole.USER, flatAfterChanges.getUsers().get(user2.getId()).getRole());
    }

    @Test
    public void addUserToFlatNotFoundTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new AddUserFlatDto(
                user2.getId().toString(), "USER"
        );

        when(flatRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> flatService.addUserToFlat(user, flat.getId().toString(), dto));

    }

    @Test
    public void addUserToFlatNotAsOwnerTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user2.getId(), user2.getUsername(), FlatRole.OWNER
        ));

        var dto = new AddUserFlatDto(
                user.getId().toString(), "USER"
        );

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        assertThrows(AccessForbiddenException.class, () -> flatService.addUserToFlat(user, flat.getId().toString(), dto));

    }

    @Test
    public void addUserToFlatWithWrongRoleTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new AddUserFlatDto(
                user2.getId().toString(), "OWNER"
        );

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        assertThrows(AccessForbiddenException.class, () -> flatService.addUserToFlat(user, flat.getId().toString(), dto));

    }

    @Test
    public void addUserToFlatWithWrongRoleAndNotAsOwnerTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        var dto = new AddUserFlatDto(
                user2.getId().toString(), "OWNER"
        );

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        assertThrows(AccessForbiddenException.class, () -> flatService.addUserToFlat(user2, flat.getId().toString(), dto));

    }

    @Test
    public void addUserToFlatDuplicateTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));


        var dto = new AddUserFlatDto(
                user2.getId().toString(), "USER"
        );

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        assertThrows(EntityDuplicateException.class, () -> flatService.addUserToFlat(user, flat.getId().toString(), dto));

    }

    @Test
    public void removeUserFromFlatTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        var flatAfterChanges = flatService.removeUserFromFlat(user, flat.getId().toString(), user2.getId().toString());

        assertEquals(0, flatAfterChanges.getUsers().size());
        assertFalse(flatAfterChanges.getUsers().containsKey(user2.getId()));
    }

    @Test
    public void removeUserFromFlatAsUserTest() throws AccessForbiddenException {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        var flatAfterChanges = flatService.removeUserFromFlat(user2, flat.getId().toString(), user2.getId().toString());

        assertEquals(0, flatAfterChanges.getUsers().size());
        assertFalse(flatAfterChanges.getUsers().containsKey(user2.getId()));
    }

    @Test
    public void removeUserFromFlatNotFoundTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> flatService.removeUserFromFlat(user, flat.getId().toString(), user2.getId().toString()));
    }

    @Test
    public void removeUserFromFlatUserNotFoundTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(UUID.randomUUID(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        assertThrows(EntityNotFoundException.class, () -> flatService.removeUserFromFlat(user, flat.getId().toString(), user2.getId().toString()));
    }

    @Test
    public void removeUserFromFlatAccessForbiddenTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var user3 = new User("test", "test", "test3", "test3@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));
        flat.getUsers().put(user3.getId(), new FlatUser(user3.getId(), user3.getUsername(), FlatRole.USER));

        when(flatRepository.findById(any())).thenReturn(Optional.of(flat));
        when(userService.getUser(any())).thenReturn(user2);

        assertThrows(AccessForbiddenException.class, () -> flatService.removeUserFromFlat(user3, flat.getId().toString(), user2.getId().toString()));
    }

    @Test
    public void flatToDtoTest() {
        var user = new User("test", "test", "test", "test@test.com");
        var user2 = new User("test", "test", "test2", "test2@test.com");
        var user3 = new User("test", "test", "test3", "test3@test.com");
        var flat = new Flat("testFlat", new FlatUser(
                user.getId(), user.getUsername(), FlatRole.OWNER
        ));

        flat.getUsers().put(user2.getId(), new FlatUser(user2.getId(), user2.getUsername(), FlatRole.USER));
        flat.getUsers().put(user3.getId(), new FlatUser(user3.getId(), user3.getUsername(), FlatRole.USER));

        var dto = flatService.flatToDto(flat);
        assertEquals(dto.getId(), flat.getId().toString());
        assertEquals(dto.getName(), flat.getName());
        assertEquals(dto.getUsers().size(), flat.getUsers().size());
    }

}
