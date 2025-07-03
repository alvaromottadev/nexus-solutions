package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.service.ProductService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

@Component
public class TotalProductsInStockHandler implements AiCommandHandler {

    private final ProductService productService;
    private final MessageUtils messageUtils;

    public TotalProductsInStockHandler(ProductService productService, MessageUtils messageUtils) {
        this.productService = productService;
        this.messageUtils = messageUtils;
    }

    public String getName(){
        return "total_products_in_stock";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {

        Integer totalProductsInStock = productService.getTotalProductsInStock(company);
        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message("text", null, messageUtils.getMessage("oracle.total.products.in.stock", totalProductsInStock))
        );

    }

}
