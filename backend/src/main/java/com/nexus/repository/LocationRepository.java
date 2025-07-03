package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, String>, JpaSpecificationExecutor<Location> {

    Optional<Location> findByIdAndCompanyAndDeletedAtIsNull(String id, Company company);

    @Query("""
    SELECT l FROM Location l
        INNER JOIN Inventory i ON i.location = l
            WHERE i.product.name = :productName
                AND l.company = :company
                    AND l.deletedAt IS NULL
    """)
    List<Location> getLocationByProduct(@Param("productName") String productName, @Param("company") Company company);

}
