package com.nexus.controller;

import com.nexus.dto.Inventory.InventoryCreateRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.dto.Inventory.InventoryUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                             @Validated @RequestBody InventoryCreateRequest inventoryCreateRequest) {
        InventoryResponse response = inventoryService.createInventory(inventoryCreateRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{inventoryId}")
    public ResponseEntity<InventoryResponse> getInventoryById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                          @PathVariable String inventoryId) {
        InventoryResponse response = inventoryService.getInventoryById(inventoryId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventories(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<InventoryResponse> responses = inventoryService.getAllInventories(userDetails.getCompany());
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{inventoryId}")
    public ResponseEntity<InventoryResponse> updateInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                             @PathVariable String inventoryId,
                                                             @Validated @RequestBody InventoryUpdateRequest inventoryUpdateRequest) {
        InventoryResponse response = inventoryService.updateInventory(inventoryId, inventoryUpdateRequest, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @DeleteMapping("/{inventoryId}")
    public ResponseEntity<SuccessResponse> deleteInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @PathVariable String inventoryId) {
        SuccessResponse response = inventoryService.deleteInventory(inventoryId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
