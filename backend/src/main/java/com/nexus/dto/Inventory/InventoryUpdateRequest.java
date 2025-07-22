package com.nexus.dto.Inventory;

import jakarta.validation.constraints.Min;

public record InventoryUpdateRequest(

        @Min(value = 0, message = "Quantity must be at least 0")
        Integer quantity,

        @Min(value = 0, message = "Minimum stock must be at least 0")
        Integer minStock

) {
}
