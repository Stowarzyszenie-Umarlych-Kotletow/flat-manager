package com.pis.flatmanager.external;

import com.pis.flatmanager.config.AMQPProperties;
import com.pis.flatmanager.dto.external.OcrRequest;
import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.exception.OcrException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Profile("rabbit")
@Component
public class OcrGatewayImpl implements OcrGateway{

    private final String routingKey;
    private final String receivingQueueName;
    private final Integer timeout;

    private final RabbitTemplate rabbit;

    public OcrGatewayImpl(RabbitTemplate rabbitTemplate, AMQPProperties amqpProperties,
                          @Value("${flatmanager.amqp.queue.serviceQueueName}") String queueName,
                          @Value("${flatmanager.amqp.queue.timeout}") Integer timeout) {
        this.rabbit = rabbitTemplate;
        this.routingKey = amqpProperties.getOcrQueueName();
        this.receivingQueueName = queueName;
        this.timeout = timeout;
    }

    @Override
    public List<OcrResponseProduct> processReceipt(OcrRequest request) {
        this.rabbit.convertAndSend(routingKey, request);
        Map<String, List<OcrResponseProduct>> response;
        try {
            response = this.rabbit.receiveAndConvert(receivingQueueName, timeout,
                    new ParameterizedTypeReference<>() {});
        } catch(Exception e) {
            throw new OcrException("OCR service did not return any results");
        }
        if(Objects.nonNull(response)){
            return response.get("message");
        } else {
            return new ArrayList<>();
        }
    }
}
