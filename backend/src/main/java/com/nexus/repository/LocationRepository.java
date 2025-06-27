package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, String>, JpaSpecificationExecutor<Location> {

    Optional<Location> findByIdAndCompanyAndDeletedAtIsNull(String id, Company company);


}
