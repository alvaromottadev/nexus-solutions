package com.nexus.dto.Company;

import com.nexus.model.Company;

public record CompanyResponse(

        String id,
        String name

) {

    public CompanyResponse(Company company){
        this(
                company.getId(),
                company.getName()
        );
    }

}
