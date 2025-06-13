package com.nexus.dto.Address;

import com.nexus.model.Address;

public record AddressResponse(

        String id,
        String street,
        String number,
        String complement,
        String district,
        String city,
        String state,
        String postalCode,
        String country

){

    public AddressResponse(Address address){
        this(
                address.getId(),
                address.getStreet(),
                address.getNumber(),
                address.getComplement(),
                address.getDistrict(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry()
        );
    }

}
