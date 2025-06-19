package com.nexus.dto.Analytics;

import com.nexus.model.Product;

public record TopProductsMovimentationsResponse(

        String id,
        String productName,
        Long quantity)
{

    public TopProductsMovimentationsResponse(Product product, Long quantity){
        this(product.getId(), product.getName(), quantity);
    }

}
