package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Employee.*;
import com.nexus.dto.ImageResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserRequest;
import com.nexus.dto.User.UserUpdateRequest;
import com.nexus.exception.EmployeeNotFoundException;
import com.nexus.exception.InvalidEmployeeRegistrationException;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.model.enums.EmployeeRole;
import com.nexus.model.enums.UserType;
import com.nexus.repository.EmployeeRepository;
import com.nexus.repository.specification.EmployeeSpecification;
import com.nexus.utils.MessageUtils;
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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @InjectMocks
    private EmployeeService employeeService;

    @Mock
    private UserService userService;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private StorageService storageService;

    @Mock
    private MessageUtils messageUtils;

    @Mock
    private MultipartFile multipartFile;

    private User userMock;
    private User employeeUserMock;
    private Company companyMock;
    private Employee employeeMock;
    private Address addressMock;
    private AddressRequest addressRequestMock;
    private CompanyRequest companyRequestMock;
    private UserRequest userRequestMock;
    private UserRequest employeeUserRequestMock;
    private EmployeeRequest employeeRequestMock;
    private UserEmployeeRegisterRequest userEmployeeRegisterRequestMock;
    private EmployeeUpdateRequest employeeUpdateRequestMock;
    private EmployeeUpdateByIdRequest employeeUpdateByIdRequestMock;
    private UserDetailsImpl userDetailsMock;

    @BeforeEach
    void setUp() {
        String companyId = UUID.randomUUID().toString();
        String userId = UUID.randomUUID().toString();
        String employeeId = UUID.randomUUID().toString();
        String employeeUserId = UUID.randomUUID().toString();

        addressRequestMock = new AddressRequest("Main Street", "123", "Apt 1", "Downtown", "City", "State", "12345", "Country");
        companyRequestMock = new CompanyRequest("Test Company", "12345678000195", addressRequestMock);
        userRequestMock = new UserRequest("company@test.com", "password123", UserType.COMPANY);
        employeeUserRequestMock = new UserRequest("employee@test.com", "password123", UserType.EMPLOYEE);
        employeeRequestMock = new EmployeeRequest("John Doe", EmployeeRole.MANAGER);
        userEmployeeRegisterRequestMock = new UserEmployeeRegisterRequest(employeeUserRequestMock, employeeRequestMock);

        employeeUpdateRequestMock = new EmployeeUpdateRequest("Updated Name", "updated@test.com", "newpassword123");
        
        UserUpdateRequest userUpdateRequestMock = new UserUpdateRequest("updated@test.com", "newpassword123");
        employeeUpdateByIdRequestMock = new EmployeeUpdateByIdRequest(userUpdateRequestMock, "Updated Name", EmployeeRole.OPERATOR);

        userMock = new User(userRequestMock, "encoded-password");
        userMock.setId(userId);

        employeeUserMock = new User(employeeUserRequestMock, "encoded-password");
        employeeUserMock.setId(employeeUserId);

        addressMock = new Address(addressRequestMock);
        companyMock = new Company(userMock, addressMock, companyRequestMock);
        companyMock.setId(companyId);
        userMock.setCompany(companyMock);

        employeeMock = new Employee(employeeRequestMock, employeeUserMock, companyMock);
        employeeMock.setId(employeeId);
        employeeUserMock.setEmployee(employeeMock);

        userDetailsMock = new UserDetailsImpl(userMock);
    }

    @DisplayName("Should create employee successfully with valid data")
    @Test
    void createEmployeeCase1() {
        when(userService.createUser(employeeUserRequestMock)).thenReturn(employeeUserMock);
        when(employeeRepository.save(any(Employee.class))).thenReturn(employeeMock);

        EmployeeResponse actual = employeeService.createEmployee(userEmployeeRegisterRequestMock, companyMock);

        assertNotNull(actual);
        assertEquals(employeeMock.getName(), actual.name());
        assertEquals(employeeMock.getRole(), actual.role());
        verify(userService).createUser(employeeUserRequestMock);
        verify(employeeRepository).save(any(Employee.class));
    }

    @DisplayName("Should throw InvalidEmployeeRegistrationException when user type is COMPANY")
    @Test
    void createEmployeeCase2() {
        UserRequest invalidUserRequest = new UserRequest("company@test.com", "password123", UserType.COMPANY);
        UserEmployeeRegisterRequest invalidRequest = new UserEmployeeRegisterRequest(invalidUserRequest, employeeRequestMock);

        assertThrows(InvalidEmployeeRegistrationException.class, 
            () -> employeeService.createEmployee(invalidRequest, companyMock));

        verify(userService, never()).createUser(any());
        verify(employeeRepository, never()).save(any());
    }

    @DisplayName("Should return employee by ID when exists")
    @Test
    void getEmployeeByIdCase1() {
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.of(employeeMock));

        EmployeeResponse actual = employeeService.getEmployeeById(employeeMock.getId(), companyMock);

        assertNotNull(actual);
        assertEquals(employeeMock.getId(), actual.id());
        assertEquals(employeeMock.getName(), actual.name());
        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
    }

    @DisplayName("Should throw EmployeeNotFoundException when employee not found by ID")
    @Test
    void getEmployeeByIdCase2() {
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.empty());

        assertThrows(EmployeeNotFoundException.class, 
            () -> employeeService.getEmployeeById(employeeMock.getId(), companyMock));

        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
    }

    @DisplayName("Should return employee response when getMyEmployee is called with valid employee")
    @Test
    void getMyEmployeeCase1() {
        EmployeeResponse actual = employeeService.getMyEmployee(employeeMock);

        assertNotNull(actual);
        assertEquals(employeeMock.getId(), actual.id());
        assertEquals(employeeMock.getName(), actual.name());
        assertEquals(employeeMock.getRole(), actual.role());
    }

    @DisplayName("Should throw EmployeeNotFoundException when getMyEmployee is called with null employee")
    @Test
    void getMyEmployeeCase2() {
        assertThrows(EmployeeNotFoundException.class, () -> employeeService.getMyEmployee(null));
    }

    @DisplayName("Should return paginated employees list")
    @Test
    void getAllEmployeesCase1() {
        String name = "John";
        int page = 0;
        int size = 10;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Employee> employeePage = new PageImpl<>(Arrays.asList(employeeMock));

        try (MockedStatic<EmployeeSpecification> mockedStatic = mockStatic(EmployeeSpecification.class)) {
            Specification<Employee> spec = mock(Specification.class);
            mockedStatic.when(() -> EmployeeSpecification.filterBy(name, companyMock)).thenReturn(spec);
            when(employeeRepository.findAll(spec, pageRequest)).thenReturn(employeePage);

            Page<EmployeeResponse> actual = employeeService.getAllEmployees(name, page, size, companyMock);

            assertNotNull(actual);
            assertEquals(1, actual.getTotalElements());
            assertEquals(employeeMock.getId(), actual.getContent().get(0).id());
            verify(employeeRepository).findAll(spec, pageRequest);
        }
    }

    @DisplayName("Should update employee successfully")
    @Test
    void updateEmployeeCase1() {
        doNothing().when(userService).validatePassword(employeeUserMock, employeeUpdateRequestMock.password());
        doNothing().when(userService).updateUserWithoutPassword(employeeUserMock, employeeUpdateRequestMock.email());
        when(employeeRepository.save(employeeMock)).thenReturn(employeeMock);

        EmployeeResponse actual = employeeService.updateEmployee(employeeMock, employeeUpdateRequestMock);

        assertNotNull(actual);
        assertEquals(employeeMock.getId(), actual.id());
        assertNotNull(employeeMock.getUpdatedAt());
        verify(userService).validatePassword(employeeUserMock, employeeUpdateRequestMock.password());
        verify(userService).updateUserWithoutPassword(employeeUserMock, employeeUpdateRequestMock.email());
        verify(employeeRepository).save(employeeMock);
    }

    @DisplayName("Should update employee by ID successfully")
    @Test
    void updateEmployeeByIdCase1() {
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.of(employeeMock));
        doNothing().when(userService).updateUserWithPassword(
            employeeUserMock, 
            employeeUpdateByIdRequestMock.user().email(), 
            employeeUpdateByIdRequestMock.user().password()
        );

        EmployeeResponse actual = employeeService.updateEmployeeById(employeeMock.getId(), employeeUpdateByIdRequestMock, userDetailsMock);

        assertNotNull(actual);
        assertEquals(employeeMock.getId(), actual.id());
        assertEquals(employeeUpdateByIdRequestMock.name(), employeeMock.getName());
        assertEquals(employeeUpdateByIdRequestMock.role(), employeeMock.getRole());
        assertNotNull(employeeMock.getUpdatedAt());
        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
        verify(userService).updateUserWithPassword(
            employeeUserMock, 
            employeeUpdateByIdRequestMock.user().email(), 
            employeeUpdateByIdRequestMock.user().password()
        );
    }

    @DisplayName("Should throw EmployeeNotFoundException when updating non-existent employee by ID")
    @Test
    void updateEmployeeByIdCase2() {
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.empty());

        assertThrows(EmployeeNotFoundException.class, 
            () -> employeeService.updateEmployeeById(employeeMock.getId(), employeeUpdateByIdRequestMock, userDetailsMock));

        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
        verify(userService, never()).updateUserWithPassword(any(), anyString(), anyString());
    }

    @DisplayName("Should update employee avatar by ID successfully")
    @Test
    void updateEmployeeAvatarByIdCase1() {
        String avatarUrl = "https://storage.com/avatar_" + employeeMock.getId();
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.of(employeeMock));
        when(storageService.uploadImage(multipartFile, "avatar_" + employeeMock.getId())).thenReturn(avatarUrl);
        when(employeeRepository.save(employeeMock)).thenReturn(employeeMock);

        ImageResponse actual = employeeService.updateEmployeeAvatarById(employeeMock.getId(), multipartFile, companyMock);

        assertNotNull(actual);
        assertEquals(avatarUrl, actual.avatar());
        assertEquals(avatarUrl, employeeMock.getAvatar());
        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
        verify(storageService).uploadImage(multipartFile, "avatar_" + employeeMock.getId());
        verify(employeeRepository).save(employeeMock);
    }

    @DisplayName("Should update employee avatar successfully")
    @Test
    void updateEmployeeAvatarCase1() {
        String avatarUrl = "https://storage.com/avatar_" + employeeMock.getId();
        when(storageService.uploadImage(multipartFile, "avatar_" + employeeMock.getId())).thenReturn(avatarUrl);
        when(employeeRepository.save(employeeMock)).thenReturn(employeeMock);

        ImageResponse actual = employeeService.updateEmployeeAvatar(employeeMock, multipartFile);

        assertNotNull(actual);
        assertEquals(avatarUrl, actual.avatar());
        assertEquals(avatarUrl, employeeMock.getAvatar());
        verify(storageService).uploadImage(multipartFile, "avatar_" + employeeMock.getId());
        verify(employeeRepository).save(employeeMock);
    }

    @DisplayName("Should delete employee successfully")
    @Test
    void deleteEmployeeCase1() {
        String successMessage = "Employee deleted successfully";
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.of(employeeMock));
        when(messageUtils.getMessage("employee.deleted.success")).thenReturn(successMessage);
        doNothing().when(userService).deleteUser(employeeUserMock);
        when(employeeRepository.save(employeeMock)).thenReturn(employeeMock);

        SuccessResponse actual = employeeService.deleteEmployee(employeeMock.getId(), companyMock);

        assertNotNull(actual);
        assertEquals(successMessage, actual.success());
        assertNotNull(employeeMock.getDeletedAt());
        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
        verify(userService).deleteUser(employeeUserMock);
        verify(employeeRepository).save(employeeMock);
    }

    @DisplayName("Should throw EmployeeNotFoundException when deleting non-existent employee")
    @Test
    void deleteEmployeeCase2() {
        when(employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock))
            .thenReturn(Optional.empty());

        assertThrows(EmployeeNotFoundException.class, 
            () -> employeeService.deleteEmployee(employeeMock.getId(), companyMock));

        verify(employeeRepository).findByIdAndCompanyAndDeletedAtIsNull(employeeMock.getId(), companyMock);
        verify(userService, never()).deleteUser(any());
        verify(employeeRepository, never()).save(any());
    }

    @DisplayName("Should return employees quantity")
    @Test
    void getEmployeesQuantityCase1() {
        Integer expectedQuantity = 5;
        when(employeeRepository.getEmployeesQuantity(companyMock)).thenReturn(Optional.of(expectedQuantity));

        Integer actual = employeeService.getEmployeesQuantity(companyMock);

        assertEquals(expectedQuantity, actual);
        verify(employeeRepository).getEmployeesQuantity(companyMock);
    }

    @DisplayName("Should return zero when no employees found")
    @Test
    void getEmployeesQuantityCase2() {
        when(employeeRepository.getEmployeesQuantity(companyMock)).thenReturn(Optional.empty());

        Integer actual = employeeService.getEmployeesQuantity(companyMock);

        assertEquals(0, actual);
        verify(employeeRepository).getEmployeesQuantity(companyMock);
    }

    @DisplayName("Should return employees by role")
    @Test
    void getEmployeesByRoleCase1() {
        EmployeeRole role = EmployeeRole.MANAGER;
        List<Employee> employees = Arrays.asList(employeeMock);
        when(employeeRepository.getEmployeesByRole(role, companyMock)).thenReturn(employees);

        List<EmployeeResponse> actual = employeeService.getEmployeesByRole(role, companyMock);

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertEquals(employeeMock.getId(), actual.get(0).id());
        assertEquals(role, actual.get(0).role());
        verify(employeeRepository).getEmployeesByRole(role, companyMock);
    }

    @DisplayName("Should return empty list when no employees found by role")
    @Test
    void getEmployeesByRoleCase2() {
        EmployeeRole role = EmployeeRole.MANAGER;
        when(employeeRepository.getEmployeesByRole(role, companyMock)).thenReturn(Arrays.asList());

        List<EmployeeResponse> actual = employeeService.getEmployeesByRole(role, companyMock);

        assertNotNull(actual);
        assertTrue(actual.isEmpty());
        verify(employeeRepository).getEmployeesByRole(role, companyMock);
    }

    @DisplayName("Should handle avatar update with existing avatar")
    @Test
    void updateEmployeeAvatarCase2() {
        String oldAvatarUrl = "https://storage.com/old_avatar";
        String newAvatarUrl = "https://storage.com/avatar_" + employeeMock.getId();
        
        employeeMock.setAvatar(oldAvatarUrl);
        when(storageService.uploadImage(multipartFile, "avatar_" + employeeMock.getId())).thenReturn(newAvatarUrl);
        when(employeeRepository.save(employeeMock)).thenReturn(employeeMock);

        ImageResponse actual = employeeService.updateEmployeeAvatar(employeeMock, multipartFile);

        assertNotNull(actual);
        assertEquals(newAvatarUrl, actual.avatar());
        assertEquals(newAvatarUrl, employeeMock.getAvatar());
        assertNotEquals(oldAvatarUrl, employeeMock.getAvatar());
        verify(storageService).uploadImage(multipartFile, "avatar_" + employeeMock.getId());
        verify(employeeRepository).save(employeeMock);
    }

    @DisplayName("Should maintain data integrity during employee name update")
    @Test
    void updateEmployeeCase2() {
        String originalName = employeeMock.getName();
        LocalDateTime originalUpdatedAt = employeeMock.getUpdatedAt();
        
        doNothing().when(userService).validatePassword(employeeUserMock, employeeUpdateRequestMock.password());
        doNothing().when(userService).updateUserWithoutPassword(employeeUserMock, employeeUpdateRequestMock.email());
        when(employeeRepository.save(employeeMock)).thenReturn(employeeMock);

        EmployeeResponse actual = employeeService.updateEmployee(employeeMock, employeeUpdateRequestMock);

        assertNotNull(actual);
        assertEquals(employeeUpdateRequestMock.name(), employeeMock.getName());
        assertNotEquals(originalName, employeeMock.getName());
        assertNotEquals(originalUpdatedAt, employeeMock.getUpdatedAt());
        verify(userService).validatePassword(employeeUserMock, employeeUpdateRequestMock.password());
        verify(userService).updateUserWithoutPassword(employeeUserMock, employeeUpdateRequestMock.email());
        verify(employeeRepository).save(employeeMock);
    }
}
