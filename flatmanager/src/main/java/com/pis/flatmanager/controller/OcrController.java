package com.pis.flatmanager.controller;

import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.exception.AccessForbiddenException;
import com.pis.flatmanager.service.interfaces.FileService;
import com.pis.flatmanager.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Profile("rabbit")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/ocr")
public class OcrController {

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @PostMapping(path="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<OcrResponseProduct>> uploadFile(@RequestPart("file") MultipartFile file) throws AccessForbiddenException, IOException {
        return new ResponseEntity<>(
                fileService.processReceipt(userService.getCurrentUser(), file),
                HttpStatus.OK
        );
    }
}
