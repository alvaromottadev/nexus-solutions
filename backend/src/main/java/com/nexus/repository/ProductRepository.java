package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String>, JpaSpecificationExecutor<Product> {

    Optional<Product> findByIdAndCompanyAndDeletedAtIsNull(String id, Company company);

    Optional<Product> findByPublicIdAndCompanyAndDeletedAtIsNull(String publicId, Company company);

    @Query("""
    SELECT p FROM Product p
    INNER JOIN Inventory i ON p.id = i.product.id
    WHERE i.quantity < i.minStock
        AND p.company = :company
            AND p.deletedAt IS NULL
    """)
    List<Product> findAllWithLowStock(@Param("company") Company company);

    @Query("""
    SELECT COUNT(p) FROM Product p
        INNER JOIN Inventory i ON p.id = i.product.id
        WHERE p.company = :company
            AND p.deletedAt IS NULL
                AND i.quantity > i.minStock
    """)
    Integer getTotalProductsInStock(@Param("company") Company company);

    @Query("""
    SELECT SUM(i.quantity) FROM Product p
        INNER JOIN Inventory i ON p.id = i.product.id
        WHERE p.name LIKE CONCAT('%', :productName, '%')
            AND p.company = :company
                AND p.deletedAt IS NULL
    """)
    Optional<Integer> getProductQuantity(@Param("productName") String productName, @Param("company") Company company);

}
