package com.pis.flatmanager.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("rabbit")
@EnableAutoConfiguration(exclude = {RabbitAutoConfiguration.class})
@EnableRabbit
public class AMQPConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(AMQPConfiguration.class);

    private static final String OCR_CONNECTION_ID = "ocr";
    private static final String MANAGER_CONNECTION_ID = "service";

    @Bean
    public Queue queue(AMQPProperties amqpProperties) {
        return new Queue(amqpProperties.getQueueName(OCR_CONNECTION_ID), false);
    }

    @Bean
    public ConnectionFactory ocrConnectionFactory(AMQPProperties amqpProperties) {
        final AMQPProperties.AMQPConfiguration configuration = amqpProperties
                .getQueue().get(OCR_CONNECTION_ID);
        return buildConnectionFactory(configuration);
    }

    @Bean
    public ConnectionFactory managerConnectionFactory(AMQPProperties amqpProperties) {
        final AMQPProperties.AMQPConfiguration configuration = amqpProperties
                .getQueue().get(MANAGER_CONNECTION_ID);
        return buildConnectionFactory(configuration);
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return new Jackson2JsonMessageConverter(mapper);
    }

    @Bean
    public RabbitTemplate ocrRabbitTemplate(ConnectionFactory ocrConnectionFactory, AMQPProperties amqpProperties) {

        final AMQPProperties.AMQPConfiguration configuration = amqpProperties.getQueue().get(OCR_CONNECTION_ID);
        return buildRabbitTemplate(ocrConnectionFactory, configuration);
    }


    private ConnectionFactory buildConnectionFactory(AMQPProperties.AMQPConfiguration configuration) {

        final CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setAddresses(configuration.getAddress());
        connectionFactory.setUsername(configuration.getUsername());
        connectionFactory.setPassword(configuration.getPassword());

        logger.info("Configured RabbitMQ: [queue:{}] to {}", configuration.getQueueName(), configuration.getAddress());

        return connectionFactory;
    }

    private RabbitTemplate buildRabbitTemplate(ConnectionFactory connectionFactory, AMQPProperties.AMQPConfiguration properties) {

        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
}