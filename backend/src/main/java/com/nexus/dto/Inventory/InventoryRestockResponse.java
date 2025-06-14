package com.nexus.dto.Inventory;

import com.nexus.model.Inventory;
import com.nexus.model.Product;

public record InventoryRestockResponse (

        String name,
        Integer quantity

){

    public InventoryRestockResponse(Product product, Inventory inventory){
        this(product.getName(), inventory.getQuantity());
    }

}
