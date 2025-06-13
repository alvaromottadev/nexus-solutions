package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.model.Address;
import com.nexus.repository.AddressRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address updateAddress(Address address, AddressRequest addressRequest){
        address.update(addressRequest);
        return addressRepository.save(address);
    }

    public Address save(Address address) {
        return addressRepository.save(address);
    }

}
