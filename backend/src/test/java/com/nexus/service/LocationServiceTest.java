package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Location.LocationRequest;
import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserRequest;
import com.nexus.exception.LocationNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.model.User;
import com.nexus.model.enums.UserType;
import com.nexus.repository.LocationRepository;
import com.nexus.repository.specification.LocationSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LocationServiceTest {

    @InjectMocks
    private LocationService locationService;

    @Mock
    private LocationRepository locationRepository;

    @Mock
    private AddressService addressService;

    private User userMock;
    private Company companyMock;
    private Location locationMock;
    private Address addressMock;
    private AddressRequest addressRequestMock;
    private LocationRequest locationRequestMock;

    @BeforeEach
    void setUp() {
        String locationId = UUID.randomUUID().toString();
        String userId = UUID.randomUUID().toString();

        addressRequestMock = new AddressRequest("Main Street", "123", "Apt 1", "Downtown", "City", "State", "12345", "Country");
        locationRequestMock = new LocationRequest("Warehouse A", addressRequestMock);

        UserRequest userRequestMock = new UserRequest("test@company.com", "password123", UserType.COMPANY);
        userMock = new User(userRequestMock, "encoded-password");
        userMock.setId(userId);

        addressMock = new Address(addressRequestMock);
        addressMock.setId(UUID.randomUUID().toString());

        companyMock = mock(Company.class);

        locationMock = new Location(locationRequestMock.name(), addressMock, companyMock);
        locationMock.setId(locationId);
    }

    @DisplayName("Should create location successfully when valid data is provided")
    @Test
    void createLocationCase1() {
        when(addressService.createAddress(addressRequestMock)).thenReturn(addressMock);
        when(locationRepository.save(any(Location.class))).thenReturn(locationMock);

        LocationResponse actual = locationService.createLocation(locationRequestMock, companyMock);

        assertNotNull(actual);
        assertEquals(locationRequestMock.name(), actual.name());
        assertNotNull(actual.address());

        verify(addressService).createAddress(addressRequestMock);
        verify(locationRepository).save(any(Location.class));
    }

    @DisplayName("Should return location by id when location exists")
    @Test
    void getLocationByIdCase1() {
        String locationId = locationMock.getId();
        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock))
                .thenReturn(Optional.of(locationMock));

        LocationResponse actual = locationService.getLocationById(locationId, companyMock);

        assertNotNull(actual);
        assertEquals(locationId, actual.id());
        assertEquals(locationMock.getName(), actual.name());
        assertNotNull(actual.address());

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock);
    }

    @DisplayName("Should throw LocationNotFoundException when location does not exist")
    @Test
    void getLocationByIdCase2() {
        String nonExistentLocationId = "non-existent-id";
        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(nonExistentLocationId, companyMock))
                .thenReturn(Optional.empty());

        assertThrows(LocationNotFoundException.class, () ->
            locationService.getLocationById(nonExistentLocationId, companyMock));

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(nonExistentLocationId, companyMock);
    }

    @DisplayName("Should return paginated locations when getAllLocations is called")
    @Test
    void getAllLocationsCase1() {
        String name = "Warehouse";
        int size = 10;
        int page = 0;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        List<Location> locations = List.of(locationMock);
        Page<Location> locationPage = new PageImpl<>(locations, pageRequest, 1);

        try (MockedStatic<LocationSpecification> locationSpecification = mockStatic(LocationSpecification.class)) {
            @SuppressWarnings("unchecked")
            Specification<Location> spec = mock(Specification.class);
            locationSpecification.when(() -> LocationSpecification.filterBy(companyMock, name)).thenReturn(spec);
            when(locationRepository.findAll(spec, pageRequest)).thenReturn(locationPage);

            Page<LocationResponse> actual = locationService.getAllLocations(name, size, page, companyMock);

            assertNotNull(actual);
            assertEquals(1, actual.getTotalElements());
            assertEquals(locationMock.getName(), actual.getContent().getFirst().name());

            verify(locationRepository).findAll(spec, pageRequest);
        }
    }

    @DisplayName("Should return all locations for company without pagination")
    @Test
    void getAllLocationsCase2() {
        List<Location> locations = List.of(locationMock);

        try (MockedStatic<LocationSpecification> locationSpecification = mockStatic(LocationSpecification.class)) {
            @SuppressWarnings("unchecked")
            Specification<Location> spec = mock(Specification.class);
            locationSpecification.when(() -> LocationSpecification.filterBy(companyMock, null)).thenReturn(spec);
            when(locationRepository.findAll(spec)).thenReturn(locations);

            List<LocationResponse> actual = locationService.getAllLocations(companyMock);

            assertNotNull(actual);
            assertEquals(1, actual.size());
            assertEquals(locationMock.getName(), actual.getFirst().name());

            verify(locationRepository).findAll(spec);
        }
    }

    @DisplayName("Should handle pagination with empty results")
    @Test
    void getAllLocationsCase3() {
        String name = "Non-existent";
        int size = 10;
        int page = 0;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Location> emptyPage = new PageImpl<>(List.of(), pageRequest, 0);

        try (MockedStatic<LocationSpecification> locationSpecification = mockStatic(LocationSpecification.class)) {
            @SuppressWarnings("unchecked")
            Specification<Location> spec = mock(Specification.class);
            locationSpecification.when(() -> LocationSpecification.filterBy(companyMock, name)).thenReturn(spec);
            when(locationRepository.findAll(spec, pageRequest)).thenReturn(emptyPage);

            Page<LocationResponse> actual = locationService.getAllLocations(name, size, page, companyMock);

            assertNotNull(actual);
            assertEquals(0, actual.getTotalElements());
            assertTrue(actual.getContent().isEmpty());

            verify(locationRepository).findAll(spec, pageRequest);
        }
    }

    @DisplayName("Should update location successfully when valid data is provided")
    @Test
    void updateLocationCase1() {
        String locationId = locationMock.getId();
        LocationRequest updateRequest = new LocationRequest("Updated Warehouse", addressRequestMock);

        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock))
                .thenReturn(Optional.of(locationMock));
        when(locationRepository.save(locationMock)).thenReturn(locationMock);

        LocationResponse actual = locationService.updateLocation(locationId, updateRequest, companyMock);

        assertNotNull(actual);
        assertEquals(locationId, actual.id());
        assertNotNull(actual.updatedAt());

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock);
        verify(locationRepository).save(locationMock);
    }

    @DisplayName("Should throw LocationNotFoundException when updating non-existent location")
    @Test
    void updateLocationCase2() {
        String nonExistentLocationId = "non-existent-id";
        LocationRequest updateRequest = new LocationRequest("Updated Warehouse", addressRequestMock);

        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(nonExistentLocationId, companyMock))
                .thenReturn(Optional.empty());

        assertThrows(LocationNotFoundException.class, () ->
            locationService.updateLocation(nonExistentLocationId, updateRequest, companyMock));

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(nonExistentLocationId, companyMock);
        verify(locationRepository, never()).save(any(Location.class));
    }

    @DisplayName("Should handle null address request in location update")
    @Test
    void updateLocationCase3() {
        String locationId = locationMock.getId();
        LocationRequest updateRequestWithNullAddress = new LocationRequest("Updated Warehouse", null);

        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock))
                .thenReturn(Optional.of(locationMock));
        when(locationRepository.save(locationMock)).thenReturn(locationMock);

        LocationResponse actual = locationService.updateLocation(locationId, updateRequestWithNullAddress, companyMock);

        assertNotNull(actual);
        assertEquals("Updated Warehouse", actual.name());

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock);
        verify(locationRepository).save(locationMock);
    }

    @DisplayName("Should delete location successfully by setting deletedAt")
    @Test
    void deleteLocationCase1() {
        String locationId = locationMock.getId();

        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock))
                .thenReturn(Optional.of(locationMock));
        when(locationRepository.save(locationMock)).thenReturn(locationMock);

        SuccessResponse actual = locationService.deleteLocation(locationId, companyMock);

        assertNotNull(actual);
        assertEquals("Location deleted successfully", actual.success());
        assertNotNull(locationMock.getDeletedAt());

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock);
        verify(locationRepository).save(locationMock);
    }

    @DisplayName("Should throw LocationNotFoundException when deleting non-existent location")
    @Test
    void deleteLocationCase2() {
        String nonExistentLocationId = "non-existent-id";

        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(nonExistentLocationId, companyMock))
                .thenReturn(Optional.empty());

        assertThrows(LocationNotFoundException.class, () ->
            locationService.deleteLocation(nonExistentLocationId, companyMock));

        verify(locationRepository).findByIdAndCompanyAndDeletedAtIsNull(nonExistentLocationId, companyMock);
        verify(locationRepository, never()).save(any(Location.class));
    }

    @DisplayName("Should verify deletedAt timestamp is set correctly")
    @Test
    void deleteLocationCase3() {
        String locationId = locationMock.getId();
        LocalDateTime beforeDeletion = LocalDateTime.now();

        when(locationRepository.findByIdAndCompanyAndDeletedAtIsNull(locationId, companyMock))
                .thenReturn(Optional.of(locationMock));
        when(locationRepository.save(locationMock)).thenReturn(locationMock);

        locationService.deleteLocation(locationId, companyMock);

        assertNotNull(locationMock.getDeletedAt());
        assertTrue(locationMock.getDeletedAt().isAfter(beforeDeletion) ||
                locationMock.getDeletedAt().isEqual(beforeDeletion));

        verify(locationRepository).save(locationMock);
    }

    @DisplayName("Should return locations by product name")
    @Test
    void getLocationByProductNameCase1() {
        String productName = "Test Product";
        List<Location> locations = List.of(locationMock);

        when(locationRepository.getLocationByProduct(productName, companyMock)).thenReturn(locations);

        List<LocationResponse> actual = locationService.getLocationByProductName(productName, companyMock);

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertEquals(locationMock.getName(), actual.getFirst().name());

        verify(locationRepository).getLocationByProduct(productName, companyMock);
    }

    @DisplayName("Should return empty list when no locations found by product name")
    @Test
    void getLocationByProductNameCase2() {
        String productName = "Non-existent Product";
        List<Location> emptyList = List.of();

        when(locationRepository.getLocationByProduct(productName, companyMock)).thenReturn(emptyList);

        List<LocationResponse> actual = locationService.getLocationByProductName(productName, companyMock);

        assertNotNull(actual);
        assertEquals(0, actual.size());

        verify(locationRepository).getLocationByProduct(productName, companyMock);
    }

}
