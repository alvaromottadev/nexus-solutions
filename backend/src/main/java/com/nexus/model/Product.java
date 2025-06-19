package com.nexus.model;

import com.nexus.dto.Product.ProductRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "public_id", unique = true, nullable = false)
    private String publicId = UUID.randomUUID().toString();

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "qr_code", unique = true, nullable = false)
    private String qrCode;

    @Column(name = "code")
    private String code;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JoinColumn(name = "company_id", nullable = false)
    @ManyToOne
    private Company company;

    @OneToMany(mappedBy = "product")
    private List<Inventory> inventories;

    @OneToMany(mappedBy = "product")
    private List<MovementItem> movementItems;

    public Product(ProductRequest productRequest, Company company) {
        this.name = productRequest.name();
        this.description = productRequest.description();
        this.code = productRequest.code();
        this.company = company;
        this.createdAt = LocalDateTime.now();
    }
}
