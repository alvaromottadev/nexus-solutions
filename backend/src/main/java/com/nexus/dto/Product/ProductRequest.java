package com.nexus.dto.Product;

import jakarta.validation.constraints.NotBlank;

public record ProductRequest(

        @NotBlank(message = "Name is required")
        String name,

        String description

) {
}
