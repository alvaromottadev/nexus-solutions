package com.nexus.model;

import com.nexus.model.enums.UserType;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType type;

    @OneToOne(mappedBy = "user")
    private Company company;

    @OneToOne(mappedBy = "user")
    private Employee employee;

    @OneToMany(mappedBy = "performedBy")
    private List<Movement> movement;

}
