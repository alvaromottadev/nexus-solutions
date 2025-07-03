package com.nexus.oracle.command;

import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.service.LocationService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductLocationHandler implements AiCommandHandler{

    private final LocationService locationService;
    private final MessageUtils messageUtils;

    public ProductLocationHandler(LocationService locationService, MessageUtils messageUtils) {
        this.locationService = locationService;
        this.messageUtils = messageUtils;
    }

    public String getName() {
        return "get_product_location";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        String productName = originalResponseFromAI.action().params().get("product").toString();
        List<LocationResponse> locations = locationService.getLocationByProductName(productName, company);

        if (locations.isEmpty()){
            return new AIResponse(
                    404,
                    originalResponseFromAI.header(),
                    new Message("text", null, messageUtils.getMessage("oracle.product.location.not.found", productName)),
                    null
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message("list", "location", locations),
                null
        );
    }
}
