package com.nexus.model;

import com.nexus.dto.Movement.MovementRequest;
import com.nexus.model.enums.MovementType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "movements")
public class Movement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private MovementType type;

    @Column(name = "description")
    private String description;

    @Column(name = "movement_date")
    private LocalDateTime movementDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @JoinColumn(name = "performed_by", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User performedBy;

    @JoinColumn(name = "location_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @OneToMany(mappedBy = "movement", cascade = CascadeType.ALL)
    private List<MovementItem> movementItems;

    public Movement(MovementRequest movementRequest) {
        this.type = movementRequest.type();
        this.description = movementRequest.description();
        this.movementDate = movementRequest.movementDate();
        this.createdAt = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
    }

}
