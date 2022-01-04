package com.pis.flatmanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class FlatmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlatmanagerApplication.class, args);
	}

	@Bean public ObjectMapper objectMapper() {
		ObjectMapper mapper = JsonMapper.builder()
				.findAndAddModules()
				.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
				.build();
		return mapper;
	}

}
