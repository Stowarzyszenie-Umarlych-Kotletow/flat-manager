package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.dto.transactions.CreateTransactionGroupDto;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.model.TransactionGroup;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.FileService;
import com.pis.flatmanager.service.interfaces.TransactionService;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/transaction-groups")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @PostMapping
    public ResponseEntity<TransactionGroup> createGroup(@Valid @RequestBody CreateTransactionGroupDto dto) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        var group = transactionService.createTransactionGroup(user, dto);
        return new ResponseEntity<>(group, HttpStatus.CREATED);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroupById(@PathVariable UUID groupId) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        transactionService.deleteTransactionGroup(user, groupId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<TransactionGroup> getGroupById(@PathVariable UUID groupId) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        return new ResponseEntity<>(transactionService.getTransactionGroup(user, groupId), HttpStatus.OK);
    }

    @GetMapping("/by-flat-id/{flatId}")
    public ResponseEntity<List<TransactionGroup>> getGroupsByFlatId(@PathVariable UUID flatId) throws AccessForbiddenException {
        User user = userService.getCurrentUser();
        return new ResponseEntity<>(transactionService.getTransactionGroupsByFlatId(user, flatId), HttpStatus.OK);
    }

    @PostMapping(path="/{groupId}/transactions/ocr", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<OcrResponseProduct>> uploadFile(@PathVariable UUID groupId, @RequestPart("file") MultipartFile file) throws AccessForbiddenException, IOException {
        return new ResponseEntity<>(
                fileService.processReceipt(userService.getCurrentUser(), file),
                HttpStatus.OK
        );
    }
}
