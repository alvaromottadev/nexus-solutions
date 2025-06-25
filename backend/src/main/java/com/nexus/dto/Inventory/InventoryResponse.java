package com.nexus.dto.Inventory;

import com.nexus.dto.Address.AddressResponse;
import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.model.Company;
import com.nexus.model.Inventory;

import java.time.LocalDateTime;

public record InventoryResponse(

        String id,
        Integer quantity,
        Integer minStock,
        StockStatus status,

        LocalDateTime createdAt,
        LocalDateTime updatedAt,

        ProductResponse product,
        LocationResponse location

) {

    public InventoryResponse(Inventory inventory, StockStatus status, Company company){
        this(
                inventory.getId(),
                inventory.getQuantity(),
                inventory.getMinStock(),
                status,
                inventory.getCreatedAt(),
                inventory.getUpdatedAt(),
                new ProductResponse(inventory.getProduct()),
                new LocationResponse(inventory.getLocation(), new AddressResponse(inventory.getLocation().getAddress()))
        );
    }

}
