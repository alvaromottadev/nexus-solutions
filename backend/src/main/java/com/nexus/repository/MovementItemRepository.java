package com.nexus.repository;

import com.nexus.dto.Reports.MostTradedProductsResponse;
import com.nexus.model.Company;
import com.nexus.model.MovementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovementItemRepository extends JpaRepository<MovementItem, String> {

    @Query("""
    SELECT new com.nexus.dto.Reports.MostTradedProductsResponse(mi.product.name, SUM(mi.quantity))
        FROM MovementItem mi
        JOIN mi.movement m
            WHERE m.location.company = :company
                GROUP BY mi.product.name
                ORDER BY SUM(mi.quantity) DESC
                    LIMIT 4
    """)
    List<MostTradedProductsResponse> getMostTradedProducts(@Param("company") Company company);

}
