package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, String> {

    Optional<Company> findByUser(User user);

    boolean existsByCnpj(String cnpj);

}
