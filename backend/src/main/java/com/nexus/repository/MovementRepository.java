package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MovementRepository extends JpaRepository<Movement, String>, JpaSpecificationExecutor<Movement> {

    Optional<Movement> findByIdAndLocationCompany(String id, Company company);

    @Query("""
    SELECT m FROM Movement m
        WHERE m.location.company = :company
            AND m.movementDate > CURRENT_DATE - 7 day
    """)
    List<Movement> getLastMovements(@Param("company") Company company);

}
