package com.nexus.service;

import com.nexus.dto.Inventory.InventoryRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.model.Company;
import com.nexus.model.Inventory;
import com.nexus.model.Location;
import com.nexus.model.Product;
import com.nexus.repository.InventoryRepository;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final ProductService productService;
    private final LocationService locationService;
    private final InventoryRepository inventoryRepository;

    public InventoryService(ProductService productService, LocationService locationService, InventoryRepository inventoryRepository) {
        this.productService = productService;
        this.locationService = locationService;
        this.inventoryRepository = inventoryRepository;
    }

    public InventoryResponse createInventory(InventoryRequest inventoryRequest, Company company){
        Location location = locationService.findByIdAndCompany(inventoryRequest.locationId(), company);
        Product product = productService.findByIdAndCompany(inventoryRequest.productId(), company);
        Inventory inventory = new Inventory(inventoryRequest, location, product);
        inventoryRepository.save(inventory);
        return new InventoryResponse(inventory, company);
    }

}
