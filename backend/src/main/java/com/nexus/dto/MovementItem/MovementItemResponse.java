package com.nexus.dto.MovementItem;

import com.nexus.dto.Product.ProductResponse;
import com.nexus.model.MovementItem;

public record MovementItemResponse(

        String id,
        ProductResponse product,
        Integer quantity

) {

    public MovementItemResponse(MovementItem movementItem){
        this(
                movementItem.getId(),
                new ProductResponse(movementItem.getProduct()),
                movementItem.getQuantity()
        );
    }

}
