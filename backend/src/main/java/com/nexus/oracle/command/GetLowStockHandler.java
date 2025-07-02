package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.service.ProductService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetLowStockHandler implements AiCommandHandler {

    private final ProductService productService;
    private final MessageUtils messageUtils;

    public GetLowStockHandler(ProductService productService, MessageUtils messageUtils) {
        this.productService = productService;
        this.messageUtils = messageUtils;
    }

    public String getName(){
        return "get_low_stock_products";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, String companyId){

        List<ProductResponse> lowStockProducts = productService.getProductsWithLowStock(companyId);

        if (lowStockProducts.isEmpty()){
            return new AIResponse(200, originalResponseFromAI.header(), new Message("text", null, messageUtils.getMessage("oracle.no.low.stock.products")), null);
        }

        return new AIResponse(200, originalResponseFromAI.header(), new Message("list", "product", lowStockProducts), null);
    }

}
