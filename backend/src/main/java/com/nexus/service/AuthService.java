package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Auth.UserCompanyRegisterRequest;
import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserRequest;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.User;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final CompanyService companyService;
    private final PasswordEncoder passwordEncoder;
    private final AddressService addressService;

    public AuthService(UserService userService, CompanyService companyService, PasswordEncoder passwordEncoder, AddressService addressService) {
        this.userService = userService;
        this.companyService = companyService;
        this.passwordEncoder = passwordEncoder;
        this.addressService = addressService;
    }

    @Transactional
    public SuccessResponse register(UserCompanyRegisterRequest registerRequest) {
        User user = createUser(registerRequest.user());
        Address address = createAddress(registerRequest.company().address());
        createCompany(user, address, registerRequest.company());
        return new SuccessResponse("Registration successfull");
    }

    private User createUser(UserRequest userRequest){
        String encodedPassword = passwordEncoder.encode(userRequest.password());
        User user = new User(userRequest, encodedPassword);
        return userService.save(user);
    }

    private Company createCompany(User user, Address address, CompanyRequest companyRequest){
        Company company = new Company(user, address, companyRequest);
        return companyService.save(company);
    }

    private Address createAddress(AddressRequest addressRequest){
        Address address = new Address(addressRequest);
        return addressService.save(address);
    }

}
