package com.smarttouristplatform.tourismservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConnectionTest {

    @Bean
    CommandLineRunner commandLineRunner(MongoTemplate mongoTemplate) {
        return args -> {
            try {
                mongoTemplate.getDb().listCollectionNames().first();
                System.out.println(" SUCCESSFULLY CONNECTED TO MONGODB ATLAS!");
            } catch (Exception e) {
                System.err.println(" FAILED TO CONNECT: " + e.getMessage());
            }
        };
    }
}