package com.nexus.repository;

import com.nexus.dto.Analytics.TopProductsMovimentationsResponse;
import com.nexus.model.Company;
import com.nexus.model.MovementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovementItemRepository extends JpaRepository<MovementItem, String> {

    @Query("""
    SELECT new com.nexus.dto.Analytics.TopProductsMovimentationsResponse(mi.product, COUNT(mi))
    FROM MovementItem mi
    JOIN mi.product p
    JOIN p.company c
    WHERE c = :company
    GROUP BY p.id, p.name
    ORDER BY COUNT(mi) DESC
""")
    List<TopProductsMovimentationsResponse> findTopProducts(@Param("company") Company company);

}
