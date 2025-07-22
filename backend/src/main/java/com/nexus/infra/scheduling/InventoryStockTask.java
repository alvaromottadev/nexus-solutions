package com.nexus.infra.scheduling;

import com.nexus.dto.Email.EmailRequest;
import com.nexus.dto.Inventory.InventoryRestockResponse;
import com.nexus.model.Company;
import com.nexus.model.Inventory;
import com.nexus.service.EmailService;
import com.nexus.service.InventoryService;
import com.nexus.utils.MessageUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class InventoryStockTask {

    private final InventoryService inventoryService;
    private final EmailService emailService;
    private final MessageUtils messageUtils;

    public InventoryStockTask(InventoryService inventoryService, EmailService emailService, MessageUtils messageUtils) {
        this.inventoryService = inventoryService;
        this.emailService = emailService;
        this.messageUtils = messageUtils;
    }

    @Scheduled(cron = "0 25 15 * * *")
    public void checkInventoryStock() {
        List<Inventory> inventories = inventoryService.findAllWithLowStock();
        if (!inventories.isEmpty()){
            Map<Company, List<InventoryRestockResponse>> companyProducts = inventories.stream()
                    .collect(Collectors.groupingBy(
                            inventory -> inventory.getProduct().getCompany(),
                            Collectors.mapping(inventory -> new InventoryRestockResponse(inventory.getProduct(), inventory), Collectors.toList())
                    ));

            companyProducts.forEach((company, products) -> {;
                List<InventoryRestockResponse> restockProducts = new ArrayList<>(products);
                EmailRequest emailRequest = new EmailRequest(
                        company.getUser().getEmail(),
                        messageUtils.getMessage("stock.alert.email"));
                emailService.sendRestockEmail(emailRequest, restockProducts);
            });
        }
    }

}
