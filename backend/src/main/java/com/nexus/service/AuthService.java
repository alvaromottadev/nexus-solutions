package com.nexus.service;

import com.nexus.dto.Auth.*;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Email.EmailRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.dto.User.UserResponse;
import com.nexus.exception.InvalidCompanyRegistrationException;
import com.nexus.exception.PasswordConfirmationMismatchException;
import com.nexus.infra.security.JwtTokenUtil;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.PasswordResetCode;
import com.nexus.model.User;
import com.nexus.model.enums.EmployeeRole;
import com.nexus.model.enums.UserType;
import com.nexus.utils.MessageUtils;
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
    private final MessageUtils messageUtils;
    private final EmailService emailService;
    private final PasswordResetCodeService passwordResetTokenService;

    public AuthService(UserService userService, CompanyService companyService, PasswordEncoder passwordEncoder, AddressService addressService, JwtTokenUtil jwtTokenUtil, MessageUtils messageUtils, EmailService emailService, PasswordResetCodeService passwordResetTokenService) {
        this.userService = userService;
        this.companyService = companyService;
        this.passwordEncoder = passwordEncoder;
        this.addressService = addressService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.messageUtils = messageUtils;
        this.emailService = emailService;
        this.passwordResetTokenService = passwordResetTokenService;
    }

    public AuthMeResponse getMe(UserDetailsImpl userDetails){
        User user = userDetails.getUser();
        Company company = userDetails.getCompany();
        EmployeeRole role = getEmployeeRole(user);
        return new AuthMeResponse(userDetails.getName(), user, company, role);
    }

    @Transactional
    public SuccessResponse register(UserCompanyRegisterRequest registerRequest) {
        validateCompanyRegistrationAsEmployee(registerRequest.user().type());
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

    @Transactional
    public SuccessResponse updatePassword(User user, PasswordUpdateRequest passwordUpdateRequest){
        userService.validatePassword(user, passwordUpdateRequest.oldPassword());
        validatePasswordIsEqual(passwordUpdateRequest.newPassword(), passwordUpdateRequest.confirmPassword());

        userService.updatePassword(user, passwordUpdateRequest.newPassword());
        userService.save(user);
        return new SuccessResponse(messageUtils.getMessage("password.update.success"));
    }

    @Transactional
    public SuccessResponse forgotPassword(ForgotPasswordRequest forgotPasswordRequest){
        User user = userService.findByEmail(forgotPasswordRequest.email());
        String resetCode = generateCode();
        passwordResetTokenService.createToken(resetCode, user);
        emailService.sendResetPasswordEmail(new EmailRequest(forgotPasswordRequest.email(), messageUtils.getMessage("forgot.password.email")), resetCode);
        return new SuccessResponse(messageUtils.getMessage("forgot.password.email.sent"));
    }

    @Transactional
    public SuccessResponse resetPassword(ResetPasswordRequest resetPasswordRequest) {

        validatePasswordIsEqual(resetPasswordRequest.password(), resetPasswordRequest.confirmPassword());

        PasswordResetCode token = passwordResetTokenService.validateCode(resetPasswordRequest.resetCode());

        User user = token.getUser();
        userService.updatePassword(user, resetPasswordRequest.password());

        token.setUsed(true);

        return new SuccessResponse(messageUtils.getMessage("password.reset.success"));
    }

    private void validatePassword(String rawPassword, String encodedPassword){
        if (!passwordEncoder.matches(rawPassword, encodedPassword)){
            throw new BadCredentialsException(messageUtils.getMessage("email.or.password.invalid"));
        }
    }

    private EmployeeRole getEmployeeRole(User user) {
        if (user.getType() == UserType.COMPANY) {
            return EmployeeRole.MANAGER;
        } else {
            return user.getEmployee().getRole();
        }
    }

    private void validatePasswordIsEqual(String newPassword, String confirmPassword){
        if (!newPassword.equals(confirmPassword)){
            throw new PasswordConfirmationMismatchException();
        }
    }

    private void validateCompanyRegistrationAsEmployee(UserType userType){
        if (userType == UserType.EMPLOYEE){
            throw new InvalidCompanyRegistrationException();
        }
    }

    private String generateCode() {
        return String.format("%06d", (int) (Math.random() * 1_000_000));
    }


}
