package com.nexus.model;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyUpdateRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
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
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @JoinColumn
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Employee> employees;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Product> products;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Location> locations;

    public void update(CompanyUpdateRequest companyUpdateRequest) {
        this.name = companyUpdateRequest.name();
        this.address.update(companyUpdateRequest.address());
        this.updatedAt = LocalDateTime.now();
    }

    public Company(User user, Address address, CompanyRequest data){
        this.name = data.name();
        this.cnpj = data.cnpj();
        this.createdAt = LocalDateTime.now();
        this.user = user;
        this.address = address;
    }

}
