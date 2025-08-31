package com.nexus.dto.Product;

import com.nexus.model.Product;

import java.io.Serializable;
import java.time.LocalDateTime;

public record ProductResponse(

        String id,
        String name,
        String description,
        String image,
        String qrCode,
        String barCode,
        String code,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) implements Serializable {

    public ProductResponse(Product product){
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImage(),
                product.getQrCode(),
                product.getBarCode(),
                product.getCode(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

}
