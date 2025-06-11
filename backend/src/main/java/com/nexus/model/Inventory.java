package com.nexus.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

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

    @JoinColumn(name = "location_id", unique = true, nullable = false)
    @ManyToOne
    private Location location;

    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne
    private Product product;

}
