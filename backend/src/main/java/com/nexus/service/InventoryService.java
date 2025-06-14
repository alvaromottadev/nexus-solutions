package com.nexus.service;

import com.nexus.dto.Inventory.InventoryRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Inventory;
import com.nexus.model.Location;
import com.nexus.model.Product;
import com.nexus.repository.InventoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Transactional
    public InventoryResponse createInventory(InventoryRequest inventoryRequest, Company company){
        Location location = locationService.findByIdAndCompany(inventoryRequest.locationId(), company);
        Product product = productService.findByIdAndCompany(inventoryRequest.productId(), company);
        Inventory inventory = new Inventory(inventoryRequest, location, product);
        inventoryRepository.save(inventory);
        return new InventoryResponse(inventory, company);
    }

    public InventoryResponse getInventoryById(String inventoryId, Company company){
        Inventory inventory = findByIdAndCompany(inventoryId, company);
        return new InventoryResponse(inventory, company);
    }

    public List<InventoryResponse> getAllInventories(Company company) {
        List<Inventory> inventories = inventoryRepository.findAllByProductCompany(company);
        return inventories.stream()
                .map(inventory -> new InventoryResponse(inventory, company))
                .toList();
    }

    @Transactional
    public InventoryResponse updateInventory(String inventoryId, InventoryRequest inventoryRequest, Company company) {
        Inventory inventory = findByIdAndCompany(inventoryId, company);
        Location location = locationService.findByIdAndCompany(inventoryRequest.locationId(), company);
        Product product = productService.findByIdAndCompany(inventoryRequest.productId(), company);

        inventory.update(inventoryRequest, location, product);
        inventoryRepository.save(inventory);
        return new InventoryResponse(inventory, company);
    }

    @Transactional
    public SuccessResponse deleteInventory(String inventoryId, Company company) {
        Inventory inventory = findByIdAndCompany(inventoryId, company);
        inventoryRepository.delete(inventory);
        return new SuccessResponse("Inventory deleted successfully");
    }

    private Inventory findByIdAndCompany(String inventoryId, Company company) {
        return inventoryRepository.findByIdAndProductCompany(inventoryId, company)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
    }

    public Inventory findByProductAndLocation(Product product, Location location) {
        return inventoryRepository.findByProductAndLocation(product, location)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product and location"));
    }

    public void save(Inventory inventory){
        inventoryRepository.save(inventory);
    }

    public List<Inventory> findAllWithLowStock(){
        return inventoryRepository.findAllWithLowStock();
    }

}
