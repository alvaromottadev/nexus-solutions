package com.nexus.dto.Product;

import com.nexus.model.Product;

import java.time.LocalDateTime;

public record ProductResponse(

        String id,
        String name,
        String description,
        String qrCode,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

    public ProductResponse(Product product){
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getQrCode(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

}
