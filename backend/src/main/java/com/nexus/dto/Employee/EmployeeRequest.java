package com.nexus.dto.Employee;

import com.nexus.model.enums.EmployeeRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeRequest(

        @NotBlank(message = "Name is required")
        String name,

        @NotNull(message = "Role is required")
        EmployeeRole role

) {
}
