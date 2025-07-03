package com.nexus.service;

import com.nexus.dto.Movement.MovementRequest;
import com.nexus.dto.Movement.MovementResponse;
import com.nexus.dto.MovementItem.MovementItemRequest;
import com.nexus.dto.MovementItem.MovementItemResponse;
import com.nexus.exception.MovementNotFoundException;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.*;
import com.nexus.model.enums.MovementType;
import com.nexus.repository.MovementRepository;
import com.nexus.repository.specification.MovementSpecification;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovementService {

    private final ProductService productService;
    private final LocationService locationService;
    private final MovementRepository movementRepository;
    private final InventoryService inventoryService;

    public MovementService(ProductService productService, LocationService locationService, MovementRepository movementRepository, InventoryService inventoryService) {
        this.productService = productService;
        this.locationService = locationService;
        this.movementRepository = movementRepository;
        this.inventoryService = inventoryService;
    }

    @Transactional
    public MovementResponse createMovement(MovementRequest movementRequest, UserDetailsImpl userDetails){
        Location location = locationService.findByIdAndCompany(movementRequest.locationId(), userDetails.getCompany());

        Movement movement = new Movement(movementRequest);
        movement.setLocation(location);
        movement.setPerformedBy(userDetails.getUser());

        List<MovementItem> items = validateMovementsItems(movementRequest.items(), movement, userDetails.getCompany());
        movement.setMovementItems(items);
        movementRepository.save(movement);

        List<MovementItemResponse> movementItemResponses = items.stream()
                .map(MovementItemResponse::new)
                .toList();

        return new MovementResponse(movement, movementItemResponses);
    }

    public List<MovementResponse> getLastMovements(Company company){
        return movementRepository.getLastMovements(company).stream()
                .map(movement -> new MovementResponse(movement, movement.getMovementItems().stream().map(MovementItemResponse::new).toList()))
                .toList();
    }

    public MovementResponse getMovementById(String movementId, Company company){
        Movement movement = findByIdAndCompany(movementId, company);
        return new MovementResponse(movement, movement.getMovementItems().stream().map(MovementItemResponse::new).toList());
    }

    public List<MovementResponse> getAllMovements(MovementType type, LocalDateTime startDate, LocalDateTime endDate, Company company){
        List<Movement> movements = movementRepository.findAll(MovementSpecification.filterBy(type, startDate, endDate, company));
        return movements.stream()
                .map(movement -> new MovementResponse(movement, movement.getMovementItems().stream().map(MovementItemResponse::new).toList()))
                .toList();
    }

    private List<MovementItem> validateMovementsItems(List<MovementItemRequest> items, Movement movement, Company company) {
        return items.stream()
                .map(item -> {

                    Product product = productService.findByIdAndCompany(item.productId(), company);
                    Inventory inventory = inventoryService.findByProductAndLocation(product, movement.getLocation());

                    if (movement.getType() == MovementType.OUT){
                        inventory.decrementQuantity(item.quantity());
                    } else {
                        inventory.incrementQuantity(item.quantity());
                    }
                    inventory.setUpdatedAt(LocalDateTime.now());
                    inventoryService.save(inventory);

                    MovementItem movementItem = new MovementItem();
                    movementItem.setProduct(productService.findByIdAndCompany(item.productId(), company));
                    movementItem.setMovement(movement);
                    movementItem.setQuantity(item.quantity());

                    return movementItem;
                }).toList();
    }

    private Movement findByIdAndCompany(String movementId, Company company) {
        return movementRepository.findByIdAndLocationCompany(movementId, company)
                .orElseThrow((MovementNotFoundException::new));
    }
}
