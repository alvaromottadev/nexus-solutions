package com.nexus.dto.Inventory;

import jakarta.validation.constraints.NotBlank;

public record InventoryRequest(

        Integer quantity,

        Integer minStock,

        @NotBlank(message = "Location ID cannot be blank")
        String locationId,

        @NotBlank(message = "Product ID cannot be blank")
        String productId

) {
}
