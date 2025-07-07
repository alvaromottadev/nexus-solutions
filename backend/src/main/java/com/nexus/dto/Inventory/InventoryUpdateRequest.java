package com.nexus.dto.Inventory;

public record InventoryUpdateRequest(

        Integer quantity,

        Integer minStock

) {
}
