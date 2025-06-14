package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface MovementRepository extends JpaRepository<Movement, String>, JpaSpecificationExecutor<Movement> {

    Optional<Movement> findByIdAndLocationCompany(String id, Company company);

}
