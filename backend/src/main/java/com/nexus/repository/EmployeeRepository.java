package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String>, JpaSpecificationExecutor<Employee> {

    Optional<Employee> findByIdAndCompanyAndDeletedAtIsNull(String employeeId, Company company);

    List<Employee> findAllByCompanyAndDeletedAtIsNull(Company company);

}
