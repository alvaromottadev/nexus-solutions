package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.model.Company;
import com.nexus.service.ProductService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ListAllProductsHandler implements AiCommandHandler {

    private final ProductService productService;
    private final MessageUtils messageUtils;

    public ListAllProductsHandler(ProductService productService, MessageUtils messageUtils) {
        this.productService = productService;
        this.messageUtils = messageUtils;
    }

    public String getName(){
        return "list_all_products";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        List<ProductResponse> products = productService.getAllProducts(company);

        if (products.isEmpty()){
            return new AIResponse(
                    200,
                    originalResponseFromAI.header(),
                    new Message("text", null, messageUtils.getMessage("oracle.no.products.found")),
                    null
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message("list", "product", products),
                null
        );

    };

}
