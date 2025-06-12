package com.nexus.dto.Company;

import com.nexus.dto.Address.AddressRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CompanyRequest(

        @NotBlank(message = "Name company is required")
        String name,

        @NotBlank(message = "CNPJ is required")
        String cnpj,

        @Valid
        @NotNull(message = "Address is required")
        AddressRequest address

) {
}
