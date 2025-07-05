package com.nexus.dto.Company;

import com.nexus.dto.Address.AddressResponse;
import com.nexus.dto.User.UserResponse;
import com.nexus.model.Company;

public record CompanyResponse(

        String id,
        String name,
        String logo,
        String cnpj,
        AddressResponse address,
        UserResponse user

) {

    public CompanyResponse(Company company){
        this(
                company.getId(),
                company.getName(),
                company.getLogo(),
                null,
                new AddressResponse(company.getAddress()),
                new UserResponse(company.getUser())
        );
    }

    public CompanyResponse(Company company, String cnpj){
        this(
                company.getId(),
                company.getName(),
                company.getLogo(),
                cnpj,
                new AddressResponse(company.getAddress()),
                new UserResponse(company.getUser())
        );
    }

}
