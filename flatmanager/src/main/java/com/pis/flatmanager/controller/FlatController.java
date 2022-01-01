package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.flats.*;
import com.pis.flatmanager.exception.*;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.FlatService;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/flats")
public class FlatController {
    @Autowired
    private FlatService flatService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createFlat(@Valid @RequestBody CreateFlatDto dto) throws FlatDuplicateException, FlatUnauthorizedException, AccessForbiddenException {
        User user = userService.getCurrentUser();
        FlatDto flatDto = flatService.flatToDto(flatService.createFlat(user, dto));
        return new ResponseEntity<>(flatDto, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteFlatById(@PathVariable String id)
            throws FlatNotFoundException, FlatUnauthorizedException, AccessForbiddenException {

        User user = userService.getCurrentUser();
        flatService.deleteFlat(user, id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/name")
    public ResponseEntity<?> updateFlatName(@PathVariable String id, @Valid @RequestBody UpdateNameFlatDto dto)
            throws FlatNotFoundException, FlatUnauthorizedException, FlatDuplicateException, AccessForbiddenException {

        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.updateFlatName(user, id, dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFlatInfo(@PathVariable String id)
            throws FlatUnauthorizedException, FlatNotFoundException, AccessForbiddenException {
        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.getFlatInfo(user, id));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @PatchMapping("/{id}/adduser")
    public ResponseEntity<?> addFlatUser(@PathVariable String id, @Valid @RequestBody AddUserFlatDto dto)
            throws EntityNotFoundException, FlatNotFoundException, FlatUnauthorizedException, FlatServiceException, AccessForbiddenException {
        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.addUserToFlat(user, id, dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @PatchMapping("/{id}/deluser")
    public ResponseEntity<?> removeFlatUser(@PathVariable String id, @Valid @RequestBody RemoveUserFlatDto dto)
            throws FlatNotFoundException, FlatUnauthorizedException, FlatServiceException, AccessForbiddenException {

        User user = userService.getCurrentUser();
        var updatedDto = flatService.flatToDto(flatService.removeUserFromFlat(user, id, dto));
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }
}
