package com.nexus.dto.Employee;

import com.nexus.dto.User.UserUpdateRequest;
import com.nexus.model.enums.EmployeeRole;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeUpdateByIdRequest(

        @Valid
        @NotNull(message = "User information is required")
        UserUpdateRequest user,

        @NotBlank(message = "Name is required")
        String name,

        @NotNull(message = "Role is required")
        EmployeeRole role

) {

}
