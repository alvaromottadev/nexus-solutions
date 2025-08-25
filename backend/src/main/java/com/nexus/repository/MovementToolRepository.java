package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.MovementTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MovementToolRepository extends JpaRepository<MovementTool, String> {

    @Query("""
    SELECT mt FROM MovementTool mt
        WHERE mt.product.code = :code
            ORDER BY mt.movementedAt DESC
                LIMIT 1
    """)
    Optional<MovementTool> findFirstByProductCode(String code);

    List<MovementTool> findAllByProductCompanyOrderByMovementedAtDesc(Company company);

}
