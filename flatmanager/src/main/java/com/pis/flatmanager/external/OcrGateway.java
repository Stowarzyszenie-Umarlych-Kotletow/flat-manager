package com.pis.flatmanager.external;


import com.pis.flatmanager.dto.external.OcrRequest;
import com.pis.flatmanager.dto.external.OcrResponseProduct;

import java.util.List;

public interface OcrGateway {
    List<OcrResponseProduct> processReceipt(OcrRequest request);
}
