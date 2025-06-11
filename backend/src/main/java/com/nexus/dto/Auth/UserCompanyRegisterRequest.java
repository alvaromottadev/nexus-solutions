package com.nexus.dto.Auth;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.User.UserRequest;

public record UserCompanyRegisterRequest(

        UserRequest user,
        CompanyRequest company

){
}
