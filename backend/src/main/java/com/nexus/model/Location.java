package com.nexus.model;

import com.nexus.dto.Location.LocationRequest;
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
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @JoinColumn(name = "address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @JoinColumn(name = "company_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    @OneToMany(mappedBy = "location")
    private List<Inventory> inventories;

    @OneToMany(mappedBy = "location")
    private List<Movement> movements;

    public void update(LocationRequest locationRequest) {
        this.name = locationRequest.name();
        this.updatedAt = LocalDateTime.now();
        if (locationRequest.address() != null) {
            this.address.update(locationRequest.address());
        }
    }

    public Location(String name, Address address, Company company){
        this.name = name;
        this.address = address;
        this.createdAt = LocalDateTime.now();
        this.company = company;
    }

}
