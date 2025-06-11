package com.nexus.model;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CookieValue;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "cnpj", unique = true, nullable = false)
    private String cnpj;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JoinColumn(name = "user_id")
    @OneToOne
    private User user;


}
