package com.pis.flatmanager.external;

import com.pis.flatmanager.config.AMQPProperties;
import com.pis.flatmanager.dto.external.OcrRequest;
import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.exception.OcrException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
public class OcrGatewayImpl implements OcrGateway{

    private final String routingKey;
    private static final String CONNECTION_ID_OCR = "ocr";

    private final RabbitTemplate rabbit;

    public OcrGatewayImpl(RabbitTemplate ocrRabbitTemplate, AMQPProperties amqpProperties) {
        this.rabbit = ocrRabbitTemplate;
        this.routingKey = amqpProperties.getQueueName(CONNECTION_ID_OCR);
    }

    @Override
    public List<OcrResponseProduct> processReceipt(OcrRequest request) {
        this.rabbit.convertAndSend(routingKey, request);
        Map<String, List<OcrResponseProduct>> response;
        try {
            response = this.rabbit.receiveAndConvert("manager_service", 30_000, new ParameterizedTypeReference<>() {});
        } catch(Exception e) {
            throw new OcrException("OCR did not return the result");
        }
        if(Objects.nonNull(response)){
            return response.get("message");
        } else {
            return new ArrayList<>();
        }
    }
}
