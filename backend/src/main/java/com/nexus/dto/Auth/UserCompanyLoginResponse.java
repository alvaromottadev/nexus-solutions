package com.nexus.dto.Auth;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.User.UserResponse;

public record UserCompanyLoginResponse(

    String token,
    UserResponse user,
    CompanyResponse company

) {


}
