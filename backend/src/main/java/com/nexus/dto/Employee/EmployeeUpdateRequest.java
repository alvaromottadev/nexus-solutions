package com.nexus.dto.Employee;

import com.nexus.dto.User.UserUpdateRequest;

public record EmployeeUpdateRequest(

        UserUpdateRequest user,
        EmployeeRequest employee

) {

}
