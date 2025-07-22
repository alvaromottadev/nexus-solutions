package com.nexus.model;

import com.nexus.dto.Employee.EmployeeRequest;
import com.nexus.dto.Employee.EmployeeUpdateByIdRequest;
import com.nexus.model.enums.EmployeeRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private EmployeeRole role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @JoinColumn(name = "user_id")
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @JoinColumn(name = "company_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    public void update(String name){
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void update(EmployeeUpdateByIdRequest employeeRequest){
        this.name = employeeRequest.name();
        this.role = employeeRequest.role();
        this.updatedAt = LocalDateTime.now();
    }

    public Employee(EmployeeRequest employeeRequest, User user, Company company){
        this.name = employeeRequest.name();
        this.role = employeeRequest.role();
        this.createdAt = LocalDateTime.now();
        this.user = user;
        this.company = company;
    }

}
