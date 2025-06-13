package com.nexus.service;

import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.repository.LocationRepository;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location findByIdAndCompany(String id, Company company){
        return locationRepository.findByIdAndCompany(id, company)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));
    }

}
