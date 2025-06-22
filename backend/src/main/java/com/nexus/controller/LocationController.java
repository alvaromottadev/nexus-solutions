package com.nexus.controller;

import com.nexus.dto.Location.LocationRequest;
import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.LocationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<Page<LocationResponse>> getAllLocations(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                  @RequestParam(required = false) String name,
                                                                  @RequestParam(required = false, defaultValue = "5") Integer size,
                                                                  @RequestParam(required = false, defaultValue = "0") Integer page) {
        Page<LocationResponse> response = locationService.getAllLocations(name, size, page, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{locationId}")
    public ResponseEntity<LocationResponse> updateLocation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @PathVariable String locationId,
                                                           @Validated @RequestBody LocationRequest locationRequest) {
        LocationResponse response = locationService.updateLocation(locationId, locationRequest, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @DeleteMapping("/{locationId}")
    public ResponseEntity<SuccessResponse> deleteLocation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                               @PathVariable String locationId) {
        SuccessResponse response = locationService.deleteLocation(locationId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
