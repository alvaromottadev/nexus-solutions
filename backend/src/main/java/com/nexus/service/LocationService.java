package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Address.AddressResponse;
import com.nexus.dto.Location.LocationRequest;
import com.nexus.dto.Location.LocationResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.repository.LocationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final AddressService addressService;

    public LocationService(LocationRepository locationRepository, AddressService addressService) {
        this.locationRepository = locationRepository;
        this.addressService = addressService;
    }


    @Transactional
    public LocationResponse createLocation(LocationRequest locationRequest, Company company) {
        Address address = createAddress(locationRequest.address());
        Location location = new Location(locationRequest.name(), address, company);
        locationRepository.save(location);
        return new LocationResponse(location, new AddressResponse(address));
    }

    public LocationResponse getLocationById(String id, Company company) {
        Location location = findByIdAndCompany(id, company);
        return new LocationResponse(location, new AddressResponse(location.getAddress()));
    }


    public Location findByIdAndCompany(String id, Company company){
        return locationRepository.findByIdAndCompany(id, company)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));
    }

    private Address createAddress(AddressRequest addressRequest) {
        Address address = new Address(addressRequest);
        return addressService.save(address);
    }

}
