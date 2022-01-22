package com.pis.flatmanager.service;

import com.pis.flatmanager.dto.external.OcrRequest;
import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.external.OcrGatewayImpl;
import com.pis.flatmanager.model.User;
import com.pis.flatmanager.service.interfaces.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Profile("rabbit")
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private OcrGatewayImpl ocrGateway;

    @Override
    public List<OcrResponseProduct> processReceipt(User user, MultipartFile file) throws IOException {
        String encodedString = Base64.getEncoder().encodeToString(file.getBytes());
        return ocrGateway.processReceipt(new OcrRequest(encodedString));
    }
}
