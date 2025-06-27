package com.nexus.dto.Employee;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.model.Employee;
import com.nexus.model.enums.EmployeeRole;

import java.time.LocalDateTime;

public record EmployeeResponse(

        String id,
        String name,
        String avatar,
        EmployeeRole role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

    public EmployeeResponse(Employee employee){
        this(
                employee.getId(),
                employee.getName(),
                employee.getAvatar(),
                employee.getRole(),
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }

}
