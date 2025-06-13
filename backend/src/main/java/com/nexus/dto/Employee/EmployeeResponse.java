package com.nexus.dto.Employee;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.model.Employee;
import com.nexus.model.enums.EmployeeRole;

import java.time.LocalDateTime;

public record EmployeeResponse(

        String id,
        String name,
        EmployeeRole role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        CompanyResponse company

) {

    public EmployeeResponse(Employee employee){
        this(
                employee.getId(),
                employee.getName(),
                employee.getRole(),
                employee.getCreatedAt(),
                employee.getUpdatedAt(),
                new CompanyResponse(employee.getCompany())
        );
    }

}
