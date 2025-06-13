package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    Optional<Employee> findByIdAndCompany(String employeeId, Company company);

    List<Employee> findAllByCompany(Company company);

}
