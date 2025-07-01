package com.nexus.service;

import com.nexus.dto.Address.AddressRequest;
import com.nexus.dto.Auth.AuthMeResponse;
import com.nexus.dto.Auth.UserCompanyLoginRequest;
import com.nexus.dto.Auth.UserCompanyLoginResponse;
import com.nexus.dto.Auth.UserCompanyRegisterRequest;
import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Email.EmailRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserResponse;
import com.nexus.infra.security.JwtTokenUtil;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.User;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final CompanyService companyService;
    private final PasswordEncoder passwordEncoder;
    private final AddressService addressService;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthService(UserService userService, CompanyService companyService, PasswordEncoder passwordEncoder, AddressService addressService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.companyService = companyService;
        this.passwordEncoder = passwordEncoder;
        this.addressService = addressService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public AuthMeResponse getMe(UserDetailsImpl userDetails){
        User user = userDetails.getUser();
        Company company = userDetails.getCompany();
        return new AuthMeResponse(user, company);
    }

    @Transactional
    public SuccessResponse register(UserCompanyRegisterRequest registerRequest) {
        User user = userService.createUser(registerRequest.user());
        Address address = addressService.createAddress(registerRequest.company().address());
        companyService.createCompany(user, address, registerRequest.company());
        return new SuccessResponse("Registration successfull");
    }

    public UserCompanyLoginResponse login(UserCompanyLoginRequest loginRequest) {
        User user = userService.findByEmail(loginRequest.email());

        validatePassword(loginRequest.password(), user.getPassword());

        Company company = companyService.findByUser(user);
        String token = jwtTokenUtil.generateToken(new UserDetailsImpl(user));

        return new UserCompanyLoginResponse(token, new UserResponse(user), new CompanyResponse(company));
    }

    private void validatePassword(String rawPassword, String encodedPassword){
        if (!passwordEncoder.matches(rawPassword, encodedPassword)){
            throw new BadCredentialsException("Invalid email or password");
        }
    }

}
