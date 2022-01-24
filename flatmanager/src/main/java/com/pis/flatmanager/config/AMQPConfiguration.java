package com.pis.flatmanager.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
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

    @Bean
    public Queue ocrQueue(AMQPProperties amqpProperties) {
        return new Queue(amqpProperties.getOcrQueueName());
    }

    @Bean
    public Queue serviceQueue(AMQPProperties amqpProperties) {
        return new Queue(amqpProperties.getServiceQueueName());
    }

    @Bean
    public AmqpAdmin amqpAdmin(AMQPProperties amqpProperties) {
        return new RabbitAdmin(connectionFactory(amqpProperties));
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return new Jackson2JsonMessageConverter(mapper);
    }

    @Bean
    public ConnectionFactory connectionFactory(AMQPProperties properties) {

        final CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setAddresses(properties.getAddress());
        connectionFactory.setUsername(properties.getUsername());
        connectionFactory.setPassword(properties.getPassword());

        logger.info("Configured RabbitMQ: [queue:{}] to {}", properties.getOcrQueueName(), properties.getAddress());
        logger.info("Configured RabbitMQ: [queue:{}] to {}", properties.getServiceQueueName(), properties.getAddress());
        return connectionFactory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {

        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
}