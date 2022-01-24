package com.pis.flatmanager.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "flatmanager.amqp.queue")
public class AMQPProperties {

    String address;
    String username;
    String password;
    String ocrQueueName;
    String serviceQueueName;
    Integer timeout;

}