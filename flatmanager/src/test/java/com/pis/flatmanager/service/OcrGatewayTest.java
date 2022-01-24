package com.pis.flatmanager.service;

import com.pis.flatmanager.config.AMQPProperties;
import com.pis.flatmanager.dto.external.OcrRequest;
import com.pis.flatmanager.dto.external.OcrResponseProduct;
import com.pis.flatmanager.external.OcrGatewayImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class OcrGatewayTest {

    @InjectMocks
    private OcrGatewayImpl ocrGateway;

    @Mock
    RabbitTemplate rabbit;

    @Mock
    AMQPProperties amqpProperties;

    @Test
    public void processReceiptTest() {
        ReflectionTestUtils.setField(ocrGateway, "receivingQueueName", "testQueue");
        ReflectionTestUtils.setField(ocrGateway, "timeout", 30);
        ReflectionTestUtils.setField(ocrGateway, "routingKey", "ocrQueueName");

        var request = new OcrRequest("testdata");

        Map<String, List<OcrResponseProduct>> response = new HashMap<>();
        response.put("message", List.of());

        var results = ocrGateway.processReceipt(request);
        verify(rabbit, times(1)).convertAndSend(anyString(), eq(request));
        assert results.size() == 0;
    }

}
