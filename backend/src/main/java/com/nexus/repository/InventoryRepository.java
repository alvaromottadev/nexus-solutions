package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, String> {

    Optional<Inventory> findByIdAndProductCompany(String inventoryId, Company company);

}
