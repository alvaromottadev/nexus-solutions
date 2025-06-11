package com.nexus.model;

import com.nexus.model.enums.MovementType;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @JoinColumn(name = "performed_by", nullable = false)
    @ManyToOne
    private User performedBy;

    @JoinColumn(name = "location_id", nullable = false)
    @ManyToOne
    private Location location;

    @OneToMany(mappedBy = "movement")
    private List<MovementItem> movementItems;

}
