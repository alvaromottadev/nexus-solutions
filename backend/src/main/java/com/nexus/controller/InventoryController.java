package com.nexus.controller;

import com.nexus.dto.Inventory.InventoryRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                             @Validated @RequestBody InventoryRequest inventoryRequest) {
        InventoryResponse response = inventoryService.createInventory(inventoryRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

}
