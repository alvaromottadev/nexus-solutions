package com.nexus.controller;

import com.nexus.dto.Auth.UserCompanyLoginRequest;
import com.nexus.dto.Auth.UserCompanyLoginResponse;
import com.nexus.dto.Auth.UserCompanyRegisterRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<SuccessResponse> register(@Validated @RequestBody UserCompanyRegisterRequest registerRequest){
        SuccessResponse response = authService.register(registerRequest);
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserCompanyLoginResponse> login(@Validated @RequestBody UserCompanyLoginRequest loginRequest){
        UserCompanyLoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

}
