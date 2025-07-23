package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Inventory;
import com.nexus.model.Location;
import com.nexus.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, String> {

    Optional<Inventory> findByIdAndProductCompany(String inventoryId, Company company);

    @Query("""
    SELECT i FROM Inventory i
        WHERE i.product.company = :company
            AND i.location.deletedAt IS NULL
                AND i.product.deletedAt IS NULL
    """)
    List<Inventory> findAllByCompany(@Param("company") Company company);

    Optional<Inventory> findByProductAndLocation(Product product, Location location);

    @Query("""
        SELECT i FROM Inventory i
            WHERE i.quantity < i.minStock
    """)
    List<Inventory> findAllWithLowStock();

    @Query("""
    SELECT COUNT(i) > 0 FROM Inventory i
        WHERE i.product = :product
            AND i.location = :location
    """)
    boolean validateInventoryDoesNotExist(@Param("product") Product product,
                                          @Param("location") Location location);

}
