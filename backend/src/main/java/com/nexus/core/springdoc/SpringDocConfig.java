package com.nexus.core.springdoc;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class SpringDocConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Doc Nexus API")
                        .version("1.0.0")
                        .description("Nexus API Documentation")
                )
                .tags(
                        Arrays.asList(
                                new Tag().name("Authentication")
                                        .description("Endpoints for user authentication and management"),
                                new Tag().name("Company")
                                        .description("Endpoints for company management"),
                                new Tag().name("Employee")
                                        .description("Endpoints for employee management"),
                                new Tag().name("Inventory")
                                        .description("Endpoints for inventory management"),
                                new Tag().name("Location")
                                        .description("Endpoints for location management"),
                                new Tag().name("Movement")
                                        .description("Endpoints for movement management"),
                                new Tag().name("Oracle")
                                        .description("Endpoints for Oracle IA integration"),
                                new Tag().name("Product")
                                        .description("Endpoints for product management"),
                                new Tag().name("Report")
                                        .description("Endpoints for report generation and management")
                        )
                );
    }

}