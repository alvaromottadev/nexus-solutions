package com.nexus.controller;

import com.nexus.dto.Location.LocationRequest;
import com.nexus.dto.Location.LocationResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PostMapping
    public ResponseEntity<LocationResponse> createLocation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @Validated @RequestBody LocationRequest locationRequest) {
        LocationResponse response = locationService.createLocation(locationRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<LocationResponse> getLocationById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                               @PathVariable String locationId) {
        LocationResponse response = locationService.getLocationById(locationId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
