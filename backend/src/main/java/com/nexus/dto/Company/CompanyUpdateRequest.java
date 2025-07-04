package com.nexus.dto.Company;

import com.nexus.dto.Address.AddressRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CompanyUpdateRequest(

        @NotBlank(message = "Name company is required")
        String name,

        @NotBlank(message = "Email is required")
        String email,

        @NotBlank(message = "Password is required")
        String password,

        @Valid
        @NotNull(message = "Address is required")
        AddressRequest address


) {
}
