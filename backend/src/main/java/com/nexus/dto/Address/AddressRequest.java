package com.nexus.dto.Address;

public record AddressRequest(

        String street,
        String number,
        String complement,
        String district,
        String city,
        String state,
        String postalCode,
        String country

) {
}
