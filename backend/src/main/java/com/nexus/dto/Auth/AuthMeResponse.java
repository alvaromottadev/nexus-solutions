package com.nexus.dto.Auth;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.model.Company;
import com.nexus.model.User;
import com.nexus.model.enums.EmployeeRole;
import com.nexus.model.enums.UserType;

public record AuthMeResponse(

        String id,
        String email,
        UserType type,
        EmployeeRole role,
        CompanyResponse company

) {

    public AuthMeResponse(User user, Company company, EmployeeRole role){
        this(
                user.getId(),
                user.getEmail(),
                user.getType(),
                role,
                new CompanyResponse(company)
        );
    }

}
