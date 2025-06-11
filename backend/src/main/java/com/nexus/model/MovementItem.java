package com.nexus.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movements_items")
public class MovementItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @JoinColumn(name = "movement_id", nullable = false)
    @ManyToOne
    private Movement movement;

    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne
    private Product product;

}
