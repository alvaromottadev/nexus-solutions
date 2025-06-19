package com.nexus.dto.Product;

import com.nexus.model.Product;

import java.time.LocalDateTime;

public record ProductResponse(

        String id,
        String name,
        String description,
        String image,
        String qrCode,
        String code,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

    public ProductResponse(Product product){
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImage(),
                product.getQrCode(),
                product.getCode(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

}
