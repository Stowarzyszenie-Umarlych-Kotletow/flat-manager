package com.pis.flatmanager.service.interfaces;

import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    List<OcrResponseProduct> processReceipt(User user, MultipartFile file) throws IOException;
}
