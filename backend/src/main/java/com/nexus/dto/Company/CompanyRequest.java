package com.nexus.dto.Company;

import com.nexus.dto.Address.AddressRequest;

public record CompanyRequest(

        String name,
        String cnpj,
        AddressRequest address

) {
}
