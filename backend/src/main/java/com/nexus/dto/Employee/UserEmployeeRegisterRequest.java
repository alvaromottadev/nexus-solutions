package com.nexus.dto.Employee;

import com.nexus.dto.User.UserRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record UserEmployeeRegisterRequest(

        @Valid
        @NotNull(message = "User is required")
        UserRequest user,

        @Valid
        @NotNull(message = "Employee is required")
        EmployeeRequest employee

) {
}
