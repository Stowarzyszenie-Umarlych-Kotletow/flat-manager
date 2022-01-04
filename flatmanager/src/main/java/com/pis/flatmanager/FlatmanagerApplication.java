package com.pis.flatmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class FlatmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlatmanagerApplication.class, args);
	}



}
