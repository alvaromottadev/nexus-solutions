package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.model.Address;
import com.nexus.repository.AddressRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Transactional
    public Address createAddress(AddressRequest addressRequest){
        Address address = new Address(addressRequest);
        return addressRepository.save(address);
    }

}
