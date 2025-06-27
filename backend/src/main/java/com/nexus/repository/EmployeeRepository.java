package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    Optional<Employee> findByIdAndCompanyAndDeletedAtIsNull(String employeeId, Company company);

    List<Employee> findAllByCompanyAndDeletedAtIsNull(Company company);

}
