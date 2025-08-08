package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Auth.UserCompanyLoginRequest;
import com.nexus.dto.Auth.UserCompanyLoginResponse;
import com.nexus.dto.Auth.UserCompanyRegisterRequest;
import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Employee.EmployeeRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserRequest;
import com.nexus.dto.User.UserResponse;
import com.nexus.exception.InvalidCompanyRegistrationException;
import com.nexus.infra.security.JwtTokenUtil;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.model.enums.EmployeeRole;
import com.nexus.model.enums.UserType;
import com.nexus.utils.MessageUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

public class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private UserService userService;

    @Mock
    private AddressService addressService;

    @Mock
    private CompanyService companyService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenUtil jwtTokenUtil;

    @Mock
    private MessageUtils messageUtils;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    private final AddressRequest addressRequestMock = new AddressRequest("street", "123", null, "district", "city", "state", "postalCode", "country");
    private final CompanyRequest companyRequestMock = new CompanyRequest("Example", "12312312312312", addressRequestMock);

    @Test
    @DisplayName("Should return success when register a company")
    void registerCase1(){
        UserRequest userRequestMock = new UserRequest("mock@example.com", "123123", UserType.COMPANY);

        UserCompanyRegisterRequest registerRequestMock = new UserCompanyRegisterRequest(userRequestMock, companyRequestMock);

        User userMock = new User(userRequestMock, "encoded-password");
        Address addressMock = new Address(addressRequestMock);

        when(userService.createUser(userRequestMock)).thenReturn(userMock);
        when(addressService.createAddress(addressRequestMock)).thenReturn(addressMock);
        when(companyService.createCompany(userMock, addressMock, companyRequestMock)).thenReturn(new Company());

        SuccessResponse expected = new SuccessResponse("Registration successfull");
        SuccessResponse actual = authService.register(registerRequestMock);

        assertEquals(expected, actual);

    }

    @Test
    @DisplayName("Should return exception InvalidCompanyRegistrationException when UserType is EMPLOYEE")
    void registerCase2() {
        UserRequest userRequestMock = new UserRequest("mock@example.com", "123123", UserType.EMPLOYEE);
        UserCompanyRegisterRequest registerRequestMock = new UserCompanyRegisterRequest(userRequestMock, companyRequestMock);

        assertThrows(InvalidCompanyRegistrationException.class,
                () -> this.authService.register(registerRequestMock));

    }

    @Test
    @DisplayName("Should return success when logged in by the company")
    void loginCase1() {

        UserCompanyLoginRequest loginRequestMock = new UserCompanyLoginRequest("mock@example.com", "123123");

        UserRequest userRequestMock = new UserRequest("mock@example.com", "123123", UserType.COMPANY);
        User userMock = new User(userRequestMock, "encoded-password");

        when(userService.findByEmail(loginRequestMock.email())).thenReturn(userMock);
        when(passwordEncoder.matches(loginRequestMock.password(), userMock.getPassword())).thenReturn(true);

        Company companyMock = new Company(userMock, new Address(addressRequestMock), companyRequestMock);

        when(companyService.findByUser(userMock)).thenReturn(companyMock);
        when(jwtTokenUtil.generateToken(Mockito.any(UserDetailsImpl.class))).thenReturn("mocked-jwt-token");

        UserCompanyLoginResponse expected = new UserCompanyLoginResponse("mocked-jwt-token", new UserResponse(userMock), new CompanyResponse(companyMock));
        UserCompanyLoginResponse actual = this.authService.login(loginRequestMock);

        assertEquals(expected, actual);

    }

    @Test
    @DisplayName("Should return success when logged in by the employee")
    void loginCase2() {
        UserCompanyLoginRequest loginRequestMock = new UserCompanyLoginRequest("mock@example.com", "123123");

        UserRequest userRequestMock = new UserRequest("mock@example.com", "123123", UserType.EMPLOYEE);
        User userMock = new User(userRequestMock, "encoded-password");
        Company companyMock = new Company(userMock, new Address(addressRequestMock), companyRequestMock);
        Employee employeeMock = new Employee(new EmployeeRequest("employee", EmployeeRole.MANAGER), userMock, companyMock);

        employeeMock.setCompany(companyMock);

        userMock.setEmployee(employeeMock);

        when(userService.findByEmail(loginRequestMock.email())).thenReturn(userMock);
        when(passwordEncoder.matches(loginRequestMock.password(), userMock.getPassword())).thenReturn(true);


        when(companyService.findByUser(userMock)).thenReturn(companyMock);
        when(jwtTokenUtil.generateToken(Mockito.any(UserDetailsImpl.class))).thenReturn("mocked-jwt-token");

        UserCompanyLoginResponse expected = new UserCompanyLoginResponse("mocked-jwt-token", new UserResponse(userMock), new CompanyResponse(companyMock));
        UserCompanyLoginResponse actual = this.authService.login(loginRequestMock);

        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Should return exception BadCredentialsException when login fails")
    void loginCase3() {

        UserCompanyLoginRequest loginRequestMock = new UserCompanyLoginRequest("mock@example.com", "123123");
        UserRequest userRequestMock = new UserRequest("mock@example.com", "123124", UserType.COMPANY);

        User userMock = new User(userRequestMock, "encoded-password");

        when(userService.findByEmail(loginRequestMock.email())).thenReturn(userMock);
        when(passwordEncoder.matches(loginRequestMock.password(), userMock.getPassword())).thenReturn(false);

        assertThrows(BadCredentialsException.class, () -> this.authService.login(loginRequestMock));

    }


}
