package com.pis.flatmanager.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

//@Profile("rabbit")
@Configuration
@ConfigurationProperties(prefix = "flatmanager.amqp")
public class AMQPProperties {

    public String getAddress(String connectionId) {
        return getQueue().get(connectionId).getAddress();
    }

    private Map<String, AMQPConfiguration> queue = new HashMap<>();

    public Map<String, AMQPConfiguration> getQueue() {
        return queue;
    }

    public void setQueue(Map<String, AMQPConfiguration> queue) {
        this.queue = queue;
    }

    public String getQueueName(String connectionId) {
        return getQueue().get(connectionId).getQueueName();
    }

    public String getUsername(String connectionId) {
        return getQueue().get(connectionId).getUsername();
    }

    public String getPassword(String connectionId) {
        return getQueue().get(connectionId).getPassword();
    }


    public static class AMQPConfiguration {

        private String address;
        private String username;
        private String password;
        private String queueName;


        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getQueueName() {
            return queueName;
        }

        public void setQueueName(String queueName) {
            this.queueName = queueName;
        }
    }
}