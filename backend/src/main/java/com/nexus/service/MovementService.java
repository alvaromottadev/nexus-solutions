package com.nexus.service;

import com.nexus.dto.Movement.MovementRequest;
import com.nexus.dto.Movement.MovementResponse;
import com.nexus.dto.Movement.PerformedResponse;
import com.nexus.dto.MovementItem.MovementItemRequest;
import com.nexus.dto.MovementItem.MovementItemResponse;
import com.nexus.exception.InsufficientStockException;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.*;
import com.nexus.model.enums.MovementType;
import com.nexus.repository.MovementRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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

        return new MovementResponse(movement, new PerformedResponse(userDetails.getUser()), movementItemResponses);
    }

    private List<MovementItem> validateMovementsItems(List<MovementItemRequest> items, Movement movement, Company company) {
            List<MovementItem> movementItems = items.stream()
                    .map(item -> {

                        Product product = productService.findByIdAndCompany(item.productId(), company);
                        Inventory inventory = inventoryService.findByProductAndLocation(product, movement.getLocation());

                        if (movement.getType() == MovementType.OUT){
                            inventory.decrementQuantity(item.quantity());
                        } else {
                            inventory.incrementQuantity(item.quantity());
                        }

                        inventoryService.save(inventory);

                        MovementItem movementItem = new MovementItem();
                        movementItem.setProduct(productService.findByIdAndCompany(item.productId(), company));
                        movementItem.setMovement(movement);
                        movementItem.setQuantity(item.quantity());

                        return movementItem;
                    }).toList();
            return movementItems;
    }

}
