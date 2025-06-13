package com.nexus.dto.Inventory;

import com.nexus.model.Company;
import com.nexus.model.Inventory;

import java.time.LocalDateTime;

public record InventoryResponse(

        String id,
        Integer quantity,
        Integer minStock,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

    public InventoryResponse(Inventory inventory, Company company){
        this(
                inventory.getId(),
                inventory.getQuantity(),
                inventory.getMinStock(),
                inventory.getCreatedAt(),
                inventory.getUpdatedAt()
        );
    }

}
