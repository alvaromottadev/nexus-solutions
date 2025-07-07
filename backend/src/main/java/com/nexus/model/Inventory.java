package com.nexus.model;

import com.nexus.dto.Inventory.InventoryCreateRequest;
import com.nexus.dto.Inventory.InventoryUpdateRequest;
import com.nexus.exception.InsufficientStockException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "quantity", nullable = false)
    @ColumnDefault("0")
    private Integer quantity;

    @Column(name = "min_stock", nullable = false)
    @ColumnDefault("1")
    private Integer minStock;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JoinColumn(name = "location_id", nullable = false)
    @ManyToOne
    private Location location;

    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne
    private Product product;

    public void decrementQuantity(Integer quantity) {
        if (this.quantity < quantity) {
            throw new InsufficientStockException(this.product.getName());
        }
        this.quantity -= quantity;
        this.updatedAt = LocalDateTime.now();
    }

    public void incrementQuantity(Integer quantity) {
        this.quantity += quantity;
        this.updatedAt = LocalDateTime.now();
    }

    public void update(InventoryUpdateRequest inventoryUpdateRequest) {
        this.quantity = inventoryUpdateRequest.quantity();
        this.minStock = inventoryUpdateRequest.minStock();
        this.updatedAt = LocalDateTime.now();
    }

    public Inventory(InventoryCreateRequest inventoryCreateRequest, Location location, Product product) {
        this.quantity = inventoryCreateRequest.quantity();
        this.minStock = inventoryCreateRequest.minStock();
        this.createdAt = LocalDateTime.now();
        this.location = location;
        this.product = product;
    }

}
