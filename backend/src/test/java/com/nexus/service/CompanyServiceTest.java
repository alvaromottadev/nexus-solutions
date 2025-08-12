package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Company.CompanyUpdateRequest;
import com.nexus.dto.ImageResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserRequest;
import com.nexus.exception.CnpjDuplicateException;
import com.nexus.exception.CompanyNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.model.enums.UserType;
import com.nexus.repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceTest {

    @InjectMocks
    private CompanyService companyService;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private UserService userService;

    @Mock
    private StorageService storageService;

    @Mock
    private MultipartFile multipartFile;

    private User userMock;
    private Company companyMock;
    private Employee employeeMock;
    private Address addressMock;
    private AddressRequest addressRequestMock;
    private CompanyRequest companyRequestMock;
    private CompanyUpdateRequest companyUpdateRequestMock;

    @BeforeEach
    void setup() {

        String companyId = UUID.randomUUID().toString();
        String userId = UUID.randomUUID().toString();

        addressRequestMock = new AddressRequest("Main Street", "123", "Apt 1", "Downtown", "City", "State", "12345", "Country");
        companyRequestMock = new CompanyRequest("Test Company", "12345678000195", addressRequestMock);
        companyUpdateRequestMock = new CompanyUpdateRequest("Updated Company", "updated@test.com", "password123", addressRequestMock);
        UserRequest userRequestMock = new UserRequest("test@company.com", "password123", UserType.COMPANY);

        userMock = new User(userRequestMock, "encoded-password");
        userMock.setId(userId);

        addressMock = new Address(addressRequestMock);
        companyMock = new Company(userMock, addressMock, companyRequestMock);
        companyMock.setId(companyId);
        userMock.setCompany(companyMock);

        employeeMock = mock(Employee.class);
    }

    @DisplayName("Should return CompanyResponse when getMyCompany is called with valid company")
    @Test
    void getMyCompanyCase1() {
        CompanyResponse expected = new CompanyResponse(companyMock, companyMock.getCnpj());

        CompanyResponse actual = companyService.getMyCompany(companyMock);

        assertEquals(expected, actual);
    }

    @DisplayName("Should throw CompanyNotFoundException when getMyCompany is called with null company")
    @Test
    void getMyCompanyCase2() {
        assertThrows(CompanyNotFoundException.class, () -> companyService.getMyCompany(null));
    }

    @DisplayName("Should create company successfully when valid data is provided")
    @Test
    void createCompanyCase1() {
        when(companyRepository.existsByCnpj(companyRequestMock.cnpj())).thenReturn(false);
        when(companyRepository.save(any(Company.class))).thenReturn(companyMock);

        Company actual = companyService.createCompany(userMock, addressMock, companyRequestMock);

        assertNotNull(actual);
        assertEquals(companyMock, actual);
        verify(companyRepository).existsByCnpj(companyRequestMock.cnpj());
        verify(companyRepository).save(any(Company.class));
    }

    @DisplayName("Should throw CnpjDuplicateException when CNPJ already exists")
    @Test
    void createCompanyCase2() {
        when(companyRepository.existsByCnpj(companyRequestMock.cnpj())).thenReturn(true);

        assertThrows(CnpjDuplicateException.class, () ->
            companyService.createCompany(userMock, addressMock, companyRequestMock));

        verify(companyRepository).existsByCnpj(companyRequestMock.cnpj());
        verify(companyRepository, never()).save(any(Company.class));
    }

    @DisplayName("Should update company successfully when valid data is provided")
    @Test
    void updateCompanyCase1() {
        doNothing().when(userService).validatePassword(userMock, companyUpdateRequestMock.password());
        doNothing().when(userService).updateUserWithoutPassword(userMock, companyUpdateRequestMock.email());
        when(companyRepository.save(companyMock)).thenReturn(companyMock);

        CompanyResponse actual = companyService.updateCompany(companyUpdateRequestMock, companyMock);

        assertNotNull(actual);
        assertEquals(companyUpdateRequestMock.name(), actual.name());
        
        verify(userService).validatePassword(userMock, companyUpdateRequestMock.password());
        verify(userService).updateUserWithoutPassword(userMock, companyUpdateRequestMock.email());
        verify(companyRepository).save(companyMock);
    }

    @DisplayName("Should update company logo successfully")
    @Test
    void updateCompanyLogoCase1() {
        String expectedLogoUrl = "https://storage.com/logo_" + companyMock.getId();
        when(storageService.uploadImage(multipartFile, "logo_" + companyMock.getId())).thenReturn(expectedLogoUrl);
        when(companyRepository.save(companyMock)).thenReturn(companyMock);

        ImageResponse actual = companyService.updateCompanyLogo(multipartFile, companyMock);

        assertNotNull(actual);
        assertEquals(expectedLogoUrl, actual.avatar());
        assertEquals(expectedLogoUrl, companyMock.getLogo());
        
        verify(storageService).uploadImage(multipartFile, "logo_" + companyMock.getId());
        verify(companyRepository).save(companyMock);
    }

    @DisplayName("Should delete company successfully")
    @Test
    void deleteCompanyCase1() {
        doNothing().when(companyRepository).delete(companyMock);

        SuccessResponse actual = companyService.deleteCompany(companyMock);

        assertNotNull(actual);
        assertEquals("Company deleted successfully", actual.success());
        verify(companyRepository).delete(companyMock);
    }

    @DisplayName("Should find company by user when user has company directly")
    @Test
    void findByUserCase1() {
        userMock.setCompany(companyMock);

        Company actual = companyService.findByUser(userMock);

        assertNotNull(actual);
        assertEquals(companyMock, actual);
    }

    @DisplayName("Should find company by user when user is employee")
    @Test
    void findByUserCase2() {
        userMock.setCompany(null);
        when(employeeMock.getCompany()).thenReturn(companyMock);
        userMock.setEmployee(employeeMock);

        Company actual = companyService.findByUser(userMock);

        assertNotNull(actual);
        assertEquals(companyMock, actual);
        verify(employeeMock).getCompany();
    }

    @DisplayName("Should save company successfully")
    @Test
    void saveCase1() {
        when(companyRepository.save(companyMock)).thenReturn(companyMock);

        Company actual = companyService.save(companyMock);

        assertNotNull(actual);
        assertEquals(companyMock, actual);
        verify(companyRepository).save(companyMock);
    }

    @DisplayName("Should not throw exception when CNPJ does not exist")
    @Test
    void existsByCnpjCase1() {
        String validCnpj = "98765432000123";
        when(companyRepository.existsByCnpj(validCnpj)).thenReturn(false);
        when(companyRepository.save(any(Company.class))).thenReturn(companyMock);

        assertDoesNotThrow(() -> companyService.createCompany(userMock, addressMock,
            new CompanyRequest("Test", validCnpj, addressRequestMock)));
        
        verify(companyRepository).existsByCnpj(validCnpj);
    }

    @DisplayName("Should handle logo update when company has existing logo")
    @Test
    void updateCompanyLogoCase2() {
        String oldLogoUrl = "https://storage.com/old_logo";
        String newLogoUrl = "https://storage.com/logo_" + companyMock.getId();
        
        companyMock.setLogo(oldLogoUrl);
        when(storageService.uploadImage(multipartFile, "logo_" + companyMock.getId())).thenReturn(newLogoUrl);
        when(companyRepository.save(companyMock)).thenReturn(companyMock);

        ImageResponse actual = companyService.updateCompanyLogo(multipartFile, companyMock);

        assertNotNull(actual);
        assertEquals(newLogoUrl, actual.avatar());
        assertEquals(newLogoUrl, companyMock.getLogo());

        verify(storageService).uploadImage(multipartFile, "logo_" + companyMock.getId());
        verify(companyRepository).save(companyMock);
    }

}
