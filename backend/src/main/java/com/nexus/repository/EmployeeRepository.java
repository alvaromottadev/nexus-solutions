package com.nexus.repository;

import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.enums.EmployeeRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String>, JpaSpecificationExecutor<Employee> {

    Optional<Employee> findByIdAndCompanyAndDeletedAtIsNull(String employeeId, Company company);

    @Query("""
    SELECT COUNT(e) FROM Employee e
        WHERE e.company = :company
            AND e.deletedAt IS NULL
    """)
    Optional<Integer> getEmployeesQuantity(@Param("company") Company company);

    @Query("""
    SELECT e FROM Employee e
        WHERE e.role = :role
            AND e.company = :company
                AND e.deletedAt IS NULL
    """)
    List<Employee> getEmployeesByRole(@Param("role") EmployeeRole role, @Param("company") Company company);

}
