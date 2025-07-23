package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, String> {

    boolean existsByCnpj(String cnpj);

}
