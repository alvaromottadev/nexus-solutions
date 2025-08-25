package com.nexus.dto.MovementTool;

import com.nexus.dto.Product.ProductResponse;
import com.nexus.model.MovementTool;
import com.nexus.model.enums.ToolStatus;

import java.time.LocalDateTime;

public record MovementToolResponse(

        String id,
        ProductResponse product,
        LocalDateTime movementedAt,
        ToolStatus status

) {

    public MovementToolResponse(MovementTool movementTool){
        this(
                movementTool.getId(),
                new ProductResponse(movementTool.getProduct()),
                movementTool.getMovementedAt(),
                movementTool.getToolStatus()
        );
    }

}
