package com.nexus.dto.Company;

import com.nexus.dto.Address.AddressResponse;
import com.nexus.model.Company;

public record CompanyResponse(

        String id,
        String name,
        AddressResponse address

) {

    public CompanyResponse(Company company){
        this(
                company.getId(),
                company.getName(),
                new AddressResponse(company.getAddress())
        );
    }

}
