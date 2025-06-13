package com.nexus.dto.Location;

import com.nexus.dto.Address.AddressResponse;
import com.nexus.model.Location;

import java.time.LocalDateTime;

public record LocationResponse(

        String id,
        String name,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        AddressResponse address

) {

    public LocationResponse(Location location, AddressResponse address) {
        this(
                location.getId(),
                location.getName(),
                location.getCreatedAt(),
                location.getUpdatedAt(),
                address
        );
    }

}
