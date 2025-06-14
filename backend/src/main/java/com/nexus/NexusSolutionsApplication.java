package com.nexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NexusSolutionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NexusSolutionsApplication.class, args);
	}

}
