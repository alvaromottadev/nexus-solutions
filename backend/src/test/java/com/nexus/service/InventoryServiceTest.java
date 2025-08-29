package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Inventory.InventoryCreateRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.dto.Inventory.InventoryUpdateRequest;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserRequest;
import com.nexus.exception.InventoryAlreadyExistsException;
import com.nexus.exception.InventoryNotFoundException;
import com.nexus.model.*;
import com.nexus.model.enums.UserType;
import com.nexus.repository.InventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class InventoryServiceTest {

    @InjectMocks
    private InventoryService inventoryService;

    @Mock
    private ProductService productService;

    @Mock
    private LocationService locationService;

    @Mock
    private InventoryRepository inventoryRepository;

    private User employeeUserMock;
    private User companyUserMock;
    private Company companyMock;
    private Inventory inventoryMock;
    private Location locationMock;
    private Product productMock;
    private Address addressMock;
    private ProductRequest productRequestMock;
    private InventoryCreateRequest inventoryCreateRequestMock;
    private InventoryUpdateRequest inventoryUpdateRequestMock;
    private CompanyRequest companyRequestMock;
    private AddressRequest addressRequestMock;
    private UserRequest employeeUserRequest;
    private UserRequest companyUserRequest;
    private String inventoryId = UUID.randomUUID().toString();
    private String codeMock;

    @BeforeEach
    void setup() {

        String employeeId = UUID.randomUUID().toString();
        String companyId = UUID.randomUUID().toString();
        String locationId = UUID.randomUUID().toString();
        String productId = UUID.randomUUID().toString();

        inventoryUpdateRequestMock = new InventoryUpdateRequest(10, 5);
        inventoryCreateRequestMock = new InventoryCreateRequest(10, 5, locationId, productId);

        employeeUserRequest = new UserRequest("user@mock.com", "password", UserType.EMPLOYEE);
        companyUserRequest = new UserRequest("company@test.com", "password123", UserType.COMPANY);

        addressRequestMock = new AddressRequest("Main Street", "123", "Apt 1", "Downtown", "City", "State", "12345", "Country");

        companyRequestMock = new CompanyRequest("Test Company", "12345678000195", addressRequestMock);

        addressMock = new Address(addressRequestMock);

        employeeUserMock = new User(employeeUserRequest, "encoded-password");
        employeeUserMock.setId(employeeId);

        companyUserMock = new User(companyUserRequest, "encoded-password");
        companyUserMock.setId(companyId);

        locationMock = new Location("Location Name", addressMock, companyMock);
        locationMock.setId(locationId);

        companyMock = new Company(companyUserMock, addressMock, companyRequestMock);

        productRequestMock = new ProductRequest("Product Name", "Product Description");
        codeMock = "123412341234";
        productMock = new Product(productRequestMock, companyMock, codeMock);
        productMock.setId(productId);

        inventoryMock = new Inventory(inventoryCreateRequestMock, locationMock, productMock);
        inventoryMock.setId(inventoryId);

    }

    @DisplayName("Should return success when creating inventory")
    @Test
    void createInventoryCase1() {

        when(locationService.findByIdAndCompany(locationMock.getId(), companyMock)).thenReturn(locationMock);
        when(productService.findByIdAndCompany(productMock.getId(), companyMock)).thenReturn(productMock);
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(inventoryMock);
        when(inventoryRepository.validateInventoryDoesNotExist(productMock, locationMock)).thenReturn(false);

        InventoryResponse actual = this.inventoryService.createInventory(inventoryCreateRequestMock, companyMock);

        verify(inventoryRepository, times(1)).save(any(Inventory.class));
        assertEquals(inventoryCreateRequestMock.locationId(), actual.location().id());
        assertEquals(inventoryCreateRequestMock.productId(), actual.product().id());
        assertEquals(inventoryCreateRequestMock.quantity(), actual.quantity());
        assertEquals(inventoryCreateRequestMock.minStock(), actual.minStock());

    }

    @DisplayName("Should return exception InventoryAlreadyExistsException when creating inventory with existing product and location")
    @Test
    void createInventoryCase2() {

        when(locationService.findByIdAndCompany(locationMock.getId(), companyMock)).thenReturn(locationMock);
        when(productService.findByIdAndCompany(productMock.getId(), companyMock)).thenReturn(productMock);
        when(inventoryRepository.validateInventoryDoesNotExist(productMock, locationMock)).thenReturn(true);

        assertThrows(InventoryAlreadyExistsException.class,
                () -> this.inventoryService.createInventory(inventoryCreateRequestMock, companyMock));

        verify(inventoryRepository, never()).save(any(Inventory.class));

    }

    @DisplayName("Should return success when found inventory by ID")
    @Test
    void getInventoryByIdCase1() {

        when(inventoryRepository.findByIdAndProductCompany(inventoryId, companyMock)).thenReturn(Optional.of(inventoryMock));

        InventoryResponse actual = this.inventoryService.getInventoryById(inventoryId, companyMock);

        assertEquals(inventoryId, actual.id());
        assertEquals(locationMock.getId(), actual.location().id());
        assertEquals(productMock.getId(), actual.product().id());
        assertEquals(inventoryCreateRequestMock.quantity(), actual.quantity());
        assertEquals(inventoryCreateRequestMock.minStock(), actual.minStock());

    }

    @DisplayName("Should return exception InventoryNotFoundException when inventory not found by ID")
    @Test
    void getInventoryByIdCase2() {

        when(inventoryRepository.findByIdAndProductCompany(inventoryId, companyMock)).thenReturn(Optional.empty());

        assertThrows(InventoryNotFoundException.class,
                () -> this.inventoryService.getInventoryById(inventoryId, companyMock));

        verify(inventoryRepository, times(1)).findByIdAndProductCompany(inventoryId, companyMock);

    }

    @DisplayName("Should return list of all inventories for a company")
    @Test
    void getAllInventoriesCase1() {

        when(inventoryRepository.findAllByCompany(companyMock)).thenReturn(List.of(inventoryMock));

        List<InventoryResponse> actual = this.inventoryService.getAllInventories(companyMock);

        assertEquals(1, actual.size());
        assertEquals(inventoryId, actual.getFirst().id());
        assertEquals(locationMock.getId(), actual.getFirst().location().id());
        assertEquals(productMock.getId(), actual.getFirst().product().id());
        assertEquals(inventoryCreateRequestMock.quantity(), actual.getFirst().quantity());
        assertEquals(inventoryCreateRequestMock.minStock(), actual.getFirst().minStock());

    }

    @DisplayName("Should return success when updating inventory")
    @Test
    void updateInventoryCase1() {

        when(inventoryRepository.findByIdAndProductCompany(inventoryId, companyMock)).thenReturn(Optional.of(inventoryMock));
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(inventoryMock);

        InventoryResponse actual = this.inventoryService.updateInventory(inventoryId, inventoryUpdateRequestMock, companyMock);

        assertEquals(inventoryId, actual.id());
        assertEquals(locationMock.getId(), actual.location().id());
        assertEquals(productMock.getId(), actual.product().id());
        assertEquals(inventoryUpdateRequestMock.quantity(), actual.quantity());
        assertEquals(inventoryUpdateRequestMock.minStock(), actual.minStock());

    }

    @DisplayName("Should return exception InventoryNotFoundException when updating inventory not found by ID")
    @Test
    void updateInventoryCase2() {

        when(inventoryRepository.findByIdAndProductCompany(inventoryId, companyMock)).thenReturn(Optional.empty());

        assertThrows(InventoryNotFoundException.class,
                () -> this.inventoryService.updateInventory(inventoryId, inventoryUpdateRequestMock, companyMock));

        verify(inventoryRepository, times(1)).findByIdAndProductCompany(inventoryId, companyMock);
    }

    @DisplayName("Should return success when deleting inventory")
    @Test
    void deleteInventoryCase1() {

        when(inventoryRepository.findByIdAndProductCompany(inventoryId, companyMock)).thenReturn(Optional.of(inventoryMock));
        doNothing().when(inventoryRepository).delete(any(Inventory.class));

        SuccessResponse actual = this.inventoryService.deleteInventory(inventoryId, companyMock);

        assertEquals("Inventory deleted successfully", actual.success());
        verify(inventoryRepository, times(1)).delete(any(Inventory.class));

    }

    @DisplayName("Should return exception InventoryNotFoundException when deleting inventory not found by ID")
    @Test
    void deleteInventoryCase2() {

        when(inventoryRepository.findByIdAndProductCompany(inventoryId, companyMock)).thenReturn(Optional.empty());

        assertThrows(InventoryNotFoundException.class,
                () -> this.inventoryService.deleteInventory(inventoryId, companyMock));

        verify(inventoryRepository, times(1)).findByIdAndProductCompany(inventoryId, companyMock);
    }

    @DisplayName("Should return inventory by product and location")
    @Test
    void findByProductAndLocationCase1() {

        when(inventoryRepository.findByProductAndLocation(productMock, locationMock)).thenReturn(Optional.of(inventoryMock));

        Inventory actual = this.inventoryService.findByProductAndLocation(productMock, locationMock);

        assertEquals(inventoryId, actual.getId());
        assertEquals(locationMock.getId(), actual.getLocation().getId());
        assertEquals(productMock.getId(), actual.getProduct().getId());
        assertEquals(inventoryCreateRequestMock.quantity(), actual.getQuantity());
        assertEquals(inventoryCreateRequestMock.minStock(), actual.getMinStock());

    }

    @DisplayName("Should return exception InventoryNotFoundException when inventory not found by product and location")
    @Test
    void findByProductAndLocationCase2() {

        when(inventoryRepository.findByProductAndLocation(productMock, locationMock)).thenReturn(Optional.empty());

        assertThrows(InventoryNotFoundException.class,
                () -> this.inventoryService.findByProductAndLocation(productMock, locationMock));

        verify(inventoryRepository, times(1)).findByProductAndLocation(productMock, locationMock);
    }

}
