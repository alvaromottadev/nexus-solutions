package com.nexus.service;

import com.nexus.dto.Inventory.InventoryCreateRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.dto.Inventory.InventoryUpdateRequest;
import com.nexus.dto.Inventory.StockStatus;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.InventoryAlreadyExistsException;
import com.nexus.exception.InventoryNotFoundException;
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
    public InventoryResponse createInventory(InventoryCreateRequest inventoryCreateRequest, Company company){
        Location location = locationService.findByIdAndCompany(inventoryCreateRequest.locationId(), company);
        Product product = productService.findByIdAndCompany(inventoryCreateRequest.productId(), company);

        validateInventoryDoesNotExist(product, location);

        Inventory inventory = new Inventory(inventoryCreateRequest, location, product);
        StockStatus status = getStockStatus(inventory);
        inventoryRepository.save(inventory);
        return new InventoryResponse(inventory, status, company);
    }

    public InventoryResponse getInventoryById(String inventoryId, Company company){
        Inventory inventory = findByIdAndCompany(inventoryId, company);
        StockStatus status = getStockStatus(inventory);
        return new InventoryResponse(inventory, status, company);
    }

    public List<InventoryResponse> getAllInventories(Company company) {
        List<Inventory> inventories = inventoryRepository.findAllByProductCompany(company);

        return inventories.stream()
                .map(inventory -> new InventoryResponse(inventory, getStockStatus(inventory), company))
                .toList();
    }

    @Transactional
    public InventoryResponse updateInventory(String inventoryId, InventoryUpdateRequest inventoryUpdateRequest, Company company) {
        Inventory inventory = findByIdAndCompany(inventoryId, company);

        inventory.update(inventoryUpdateRequest);
        StockStatus status = getStockStatus(inventory);

        inventoryRepository.save(inventory);
        return new InventoryResponse(inventory, status, company);
    }

    @Transactional
    public SuccessResponse deleteInventory(String inventoryId, Company company) {
        Inventory inventory = findByIdAndCompany(inventoryId, company);
        inventoryRepository.delete(inventory);
        return new SuccessResponse("Inventory deleted successfully");
    }

    private Inventory findByIdAndCompany(String inventoryId, Company company) {
        return inventoryRepository.findByIdAndProductCompany(inventoryId, company)
                .orElseThrow((InventoryNotFoundException::new));
    }

    public Inventory findByProductAndLocation(Product product, Location location) {
        return inventoryRepository.findByProductAndLocation(product, location)
                .orElseThrow((InventoryNotFoundException::new));
    }

    public void save(Inventory inventory){
        inventoryRepository.save(inventory);
    }

    public List<Inventory> findAllWithLowStock(){
        return inventoryRepository.findAllWithLowStock();
    }

    private StockStatus getStockStatus(Inventory inventory) {
        if (inventory.getQuantity() < inventory.getMinStock()) {
            return StockStatus.LOW;
        } else if (inventory.getQuantity() == 0) {
            return StockStatus.OUT_OF_STOCK;
        } else {
            return StockStatus.OK;
        }
    }

    private void validateInventoryDoesNotExist(Product product, Location location){
        if (inventoryRepository.validateInventoryDoesNotExist(product, location)){
            throw new InventoryAlreadyExistsException();
        }
    }

}
