package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Address.AddressResponse;
import com.nexus.dto.Location.LocationRequest;
import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.LocationNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.repository.LocationRepository;
import com.nexus.repository.specification.LocationSpecification;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        Address address = addressService.createAddress(locationRequest.address());
        Location location = new Location(locationRequest.name(), address, company);
        locationRepository.save(location);
        return new LocationResponse(location, new AddressResponse(address));
    }

    public LocationResponse getLocationById(String id, Company company) {
        Location location = findByIdAndCompany(id, company);
        return new LocationResponse(location, new AddressResponse(location.getAddress()));
    }

    public Page<LocationResponse> getAllLocations(String name, Integer size, Integer page, Company company){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return locationRepository.findAll(LocationSpecification.filterBy(company, name), pageRequest).map(location -> {
            AddressResponse addressResponse = new AddressResponse(location.getAddress());
            return new LocationResponse(location, addressResponse);
        });
    }

    @Transactional
    public LocationResponse updateLocation(String locationId, LocationRequest locationRequest, Company company){
        Location location = findByIdAndCompany(locationId, company);
        location.update(locationRequest);
        locationRepository.save(location);

        return new LocationResponse(location, new AddressResponse(location.getAddress()));
    }

    @Transactional
    public SuccessResponse deleteLocation(String locationId, Company company) {
        Location location = findByIdAndCompany(locationId, company);
        location.setDeletedAt(LocalDateTime.now());
        locationRepository.save(location);
        return new SuccessResponse("Location deleted successfully");
    }

    public List<LocationResponse> getAllLocations(Company company){
        return locationRepository.findAll(LocationSpecification.filterBy(company, null))
                .stream()
                .map(location -> {
                    AddressResponse addressResponse = new AddressResponse(location.getAddress());
                    return new LocationResponse(location, addressResponse);
                })
                .toList();
    }

    public List<LocationResponse> getLocationByProductName(String productName, Company company){
        return locationRepository.getLocationByProduct(productName, company)
                .stream()
                .map(location -> {
                    AddressResponse addressResponse = new AddressResponse(location.getAddress());
                    return new LocationResponse(location, addressResponse);
                })
                .toList();
    }

    public Location findByIdAndCompany(String id, Company company){
        return locationRepository.findByIdAndCompanyAndDeletedAtIsNull(id, company)
                .orElseThrow((LocationNotFoundException::new));
    }

}
