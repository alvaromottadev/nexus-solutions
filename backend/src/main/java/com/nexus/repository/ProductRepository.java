package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findByIdAndCompany(String id, Company company);

}
