package com.nexus.dto.Product;

import jakarta.validation.constraints.NotBlank;

public record ProductUpdateRequest(

        @NotBlank(message = "Name is required")
        String name,

        String description,

        String code

) {
}
