package com.nexus.dto.Inventory;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record InventoryCreateRequest(

        @Min(value = 0, message = "Quantity must be at least 0")
        Integer quantity,

        @Min(value = 0, message = "Minimum stock must be at least 0")
        Integer minStock,

        @NotBlank(message = "Location ID cannot be blank")
        String locationId,

        @NotBlank(message = "Product ID cannot be blank")
        String productId

) {
}
