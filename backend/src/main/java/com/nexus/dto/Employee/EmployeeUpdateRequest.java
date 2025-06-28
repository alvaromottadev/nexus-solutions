package com.nexus.dto.Employee;

import com.nexus.dto.User.UserUpdateRequest;
import com.nexus.model.enums.EmployeeRole;
import jakarta.validation.constraints.NotBlank;

public record EmployeeUpdateRequest(

        UserUpdateRequest user,

        @NotBlank(message = "Name is required")
        String name,

        EmployeeRole role

) {

}
