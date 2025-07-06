package com.nexus.controller;

import com.nexus.dto.Auth.*;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public ResponseEntity<AuthMeResponse> getMe(@AuthenticationPrincipal UserDetailsImpl userDetails){
        AuthMeResponse response = authService.getMe(userDetails);
        return ResponseEntity.ok(response);
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

    @PutMapping("/change-password")
    public ResponseEntity<SuccessResponse> updatePassword(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                          @Validated @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        SuccessResponse response = authService.updatePassword(userDetails.getUser(), passwordUpdateRequest);
        return ResponseEntity.ok(response);
    }

}
