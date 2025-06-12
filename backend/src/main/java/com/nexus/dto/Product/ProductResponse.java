package com.nexus.dto.Product;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.model.Product;

import java.time.LocalDateTime;

public record ProductResponse(

        String id,
        String name,
        String description,
        String qrCode,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        CompanyResponse company

) {

    public ProductResponse(Product product, CompanyResponse company){
        this(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getQrCode(),
                product.getCreatedAt(),
                product.getUpdatedAt(),
                company
        );
    }

}
