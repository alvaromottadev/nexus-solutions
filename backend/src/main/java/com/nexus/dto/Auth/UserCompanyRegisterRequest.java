package com.nexus.dto.Auth;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.User.UserRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record UserCompanyRegisterRequest(

        @Valid
        @NotNull(message = "User is required")
        UserRequest user,

        @Valid
        @NotNull(message = "Company is required")
        CompanyRequest company

){
}
