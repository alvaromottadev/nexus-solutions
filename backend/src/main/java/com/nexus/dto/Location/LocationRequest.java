package com.nexus.dto.Location;

import com.nexus.dto.Address.AddressRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LocationRequest(

        @NotBlank(message = "Name is required")
        String name,

        @Valid
        @NotNull
        AddressRequest address

) {
}
