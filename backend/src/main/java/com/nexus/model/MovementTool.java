package com.nexus.model;

import com.nexus.model.enums.MovementType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tool_movements")
public class MovementTool {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private LocalDateTime movementedAt;

    @Column(nullable = false)
    private MovementType status;

    public MovementType reverseStatus(MovementType lastStatus){
        return lastStatus == MovementType.IN ? MovementType.OUT : MovementType.IN;
    }

    public MovementTool(Product product) {
        this.product = product;
        this.movementedAt = LocalDateTime.now();
        this.status = MovementType.IN;
    }

    public MovementTool(MovementTool movementTool){
        this.product = movementTool.getProduct();
        this.movementedAt = LocalDateTime.now();
        this.status = this.reverseStatus(movementTool.getStatus());
    }

}
