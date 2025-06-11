package com.nexus.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

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

    @JoinColumn(name = "address_id")
    @OneToOne
    private Address address;

    @JoinColumn(name = "company_id", nullable = false)
    @ManyToOne
    private Company company;



}
