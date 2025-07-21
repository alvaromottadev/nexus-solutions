package com.nexus.model;

import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductUpdateRequest;
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

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "qr_code", unique = true)
    private String qrCode;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @JoinColumn(name = "company_id", nullable = false)
    @ManyToOne
    private Company company;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Inventory> inventories;

    @OneToMany(mappedBy = "product")
    private List<MovementItem> movementItems;

    public void update(ProductUpdateRequest productUpdateRequest){
        this.name = productUpdateRequest.name();
        this.description = productUpdateRequest.description();
        if (productUpdateRequest.code() != null && !productUpdateRequest.code().isEmpty()){
            this.code = productUpdateRequest.code();
        }
        this.updatedAt = LocalDateTime.now();
    }

    public Product(ProductRequest productRequest, Company company) {
        this.name = productRequest.name();
        this.description = productRequest.description();
        this.code = productRequest.code();
        this.company = company;
        this.createdAt = LocalDateTime.now();
    }
}
