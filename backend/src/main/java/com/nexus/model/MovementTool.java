package com.nexus.model;

import com.nexus.model.enums.ToolStatus;
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
    private ToolStatus toolStatus;

    public ToolStatus reverseStatus(ToolStatus lastStatus){
        return lastStatus == ToolStatus.ENTRY ? ToolStatus.EXIT : ToolStatus.ENTRY;
    }

    public MovementTool(Product product) {
        this.product = product;
        this.movementedAt = LocalDateTime.now();
        this.toolStatus = ToolStatus.ENTRY;
    }

    public MovementTool(MovementTool movementTool){
        this.product = movementTool.getProduct();
        this.movementedAt = LocalDateTime.now();
        this.toolStatus = this.reverseStatus(movementTool.getToolStatus());
    }

}
