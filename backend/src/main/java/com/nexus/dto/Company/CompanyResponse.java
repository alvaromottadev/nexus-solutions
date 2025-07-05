package com.nexus.dto.Company;

import com.nexus.dto.Address.AddressResponse;
import com.nexus.dto.User.UserResponse;
import com.nexus.model.Company;

public record CompanyResponse(

        String id,
        String name,
        String avatar,
        String cnpj,
        AddressResponse address,
        UserResponse user

) {

    public CompanyResponse(Company company){
        this(
                company.getId(),
                company.getName(),
                company.getAvatar(),
                null,
                new AddressResponse(company.getAddress()),
                new UserResponse(company.getUser())
        );
    }

    public CompanyResponse(Company company, String cnpj){
        this(
                company.getId(),
                company.getName(),
                company.getAvatar(),
                cnpj,
                new AddressResponse(company.getAddress()),
                new UserResponse(company.getUser())
        );
    }

}
