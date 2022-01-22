package com.pis.flatmanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
@EnableMongoAuditing
public class FlatmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlatmanagerApplication.class, args);
	}

	@Bean public ObjectMapper objectMapper() {
		ObjectMapper mapper = JsonMapper.builder()
				.findAndAddModules()
				.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
				.configure(SerializationFeature.WRITE_DURATIONS_AS_TIMESTAMPS, false)
				.defaultDateFormat(new StdDateFormat().withColonInTimeZone(true))
				.build();
		return mapper;
	}

}
