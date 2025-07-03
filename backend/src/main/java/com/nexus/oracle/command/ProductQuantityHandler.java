package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.service.ProductService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

@Component
public class ProductQuantityHandler implements AiCommandHandler {

    private final ProductService productService;
    private final MessageUtils messageUtils;

    public ProductQuantityHandler(ProductService productService, MessageUtils messageUtils) {
        this.productService = productService;
        this.messageUtils = messageUtils;
    }

    public String getName(){
        return "product_quantity";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        String productName = (String) originalResponseFromAI.action().params().get("product");
        Integer productQuantity = productService.getProductQuantity(productName, company);

        if (productQuantity == null) {
            return new AIResponse(
                    404,
                    originalResponseFromAI.header(),
                    new Message("text", null, messageUtils.getMessage("oracle.product.not.found", productName)),
                    null
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message(
                        "text",
                        null,
                        messageUtils.getMessage("oracle.product.quantity", productName, productQuantity)
                ), null
        );
    }

}
