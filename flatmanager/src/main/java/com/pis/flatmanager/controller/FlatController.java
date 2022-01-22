package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.flats.AddUserFlatDto;
import com.pis.flatmanager.dto.flats.CreateFlatDto;
import com.pis.flatmanager.dto.flats.FlatDto;
import com.pis.flatmanager.dto.flats.UpdateNameFlatDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.exception.EntityNotFoundException;
import com.pis.flatmanager.model.FlatUser;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.model.UserFlat;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/flats")
public class FlatController {
    @Autowired
    private FlatService flatService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<FlatDto> createFlat(@Valid @RequestBody CreateFlatDto dto) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        FlatDto flatDto = flatService.flatToDto(flatService.createFlat(user, dto));
        return new ResponseEntity<>(flatDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{flatId}")
    public ResponseEntity<Void> deleteFlatById(@PathVariable UUID flatId)
            throws AccessForbiddenException {

        User user = userService.getCurrentUser();
        flatService.deleteFlat(user, flatId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{flatId}/name")
    public ResponseEntity<FlatDto> updateFlatName(@PathVariable UUID flatId, @Valid @RequestBody UpdateNameFlatDto dto)
            throws AccessForbiddenException {

        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.updateFlatName(user, flatId, dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @GetMapping("/{flatId}")
    public ResponseEntity<FlatDto> getFlatInfo(@PathVariable UUID flatId)
            throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.getFlatAsUser(user, flatId));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserFlat>> getUserFlats()
            throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        return new ResponseEntity<>(user.getFlats(), HttpStatus.OK);
    }

    @GetMapping("/{flatId}/users")
    public ResponseEntity<Collection<FlatUser>> getUsersFromFlat(@PathVariable UUID flatId) {
        var users = flatService.getUsersFromFlat(flatId);
        return new ResponseEntity<>(users.values(), HttpStatus.OK);
    }

    @PutMapping("/{flatId}/users")
    public ResponseEntity<FlatDto> addFlatUser(@PathVariable UUID flatId, @Valid @RequestBody AddUserFlatDto dto)
            throws EntityNotFoundException, AccessForbiddenException {
        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.addUserToFlat(user, flatId, dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.CREATED);
    }

    @PostMapping("/{flatId}/users/{userId}/remove")
    public ResponseEntity<FlatDto> removeFlatUser(@PathVariable UUID flatId, @PathVariable UUID userId)
            throws AccessForbiddenException {

        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.removeUserFromFlat(user, flatId, userId));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }
}
