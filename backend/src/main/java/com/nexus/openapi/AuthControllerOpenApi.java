package com.nexus.openapi;

import com.nexus.dto.Auth.*;
import com.nexus.dto.ErrorResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.SecurityConfig;
import com.nexus.infra.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;

@Tag(name = "Authentication")
public interface AuthControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user information",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthMeResponse.class)))

    })
    @Operation(summary = "Get current user information", description = "This endpoint retrieves the current authenticated user's information.")
    ResponseEntity<AuthMeResponse> getMe(@AuthenticationPrincipal UserDetailsImpl userDetails);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User and company registered successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"success\": \"Registration successful\" }"))),
            @ApiResponse(responseCode = "409", description = "Data conflict (e.g., email or CNPJ already exists)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Data conflict\" }"))),
            @ApiResponse(responseCode = "400", description = "Bad request (e.g., validation errors)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data\" }")))
    })
    @Operation(summary = "Register a new user and company",
    description = "This endpoint allows a new user to register along with their company details.",
    requestBody = @RequestBody(required = true))
    ResponseEntity<SuccessResponse> register(@Validated @RequestBody UserCompanyRegisterRequest registerRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserCompanyLoginResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized (e.g., invalid credentials)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid credentials\" }"))),
            @ApiResponse(responseCode = "404", description = "Resource not found (e.g., user or company not found)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"User not found\" }")))

    })
    @Operation(summary = "User login",
    description = "This endpoint allows a user to log in with their credentials.",
    requestBody = @RequestBody(required = true))
    ResponseEntity<UserCompanyLoginResponse> login(@Validated @org.springframework.web.bind.annotation.RequestBody UserCompanyLoginRequest loginRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"success\": \"Password updated successfully\" }"))),
            @ApiResponse(responseCode = "400", description = "Bad request (e.g., validation errors)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized (e.g., invalid current password, token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid current password\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "409", description = "Conflict (e.g., new password and confirmation do not match)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"New password and confirmation do not match\" }")))
    })
    @Operation(summary = "Update user password",
    description = "This endpoint allows the authenticated user to update their password.",
    requestBody = @RequestBody(required = true))
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<SuccessResponse> updatePassword(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                   @Validated @org.springframework.web.bind.annotation.RequestBody PasswordUpdateRequest passwordUpdateRequest);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email sent successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"success\": \"Email sent successfully\" }"))),
            @ApiResponse(responseCode = "400", description = "Bad request (e.g., validation errors)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data\" }"))),
            @ApiResponse(responseCode = "404", description = "Resource not found (e.g., user not found)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"User not found\" }"))),
    })
    @Operation(summary = "Forgot password",
    description = "This endpoint allows a user to request a password reset by sending an email with a reset code.",
    requestBody = @RequestBody(required = true))
    ResponseEntity<SuccessResponse> forgotPassword(@Validated @org.springframework.web.bind.annotation.RequestBody ForgotPasswordRequest forgotPasswordRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"success\": \"Password reset successfully\" }"))),
            @ApiResponse(responseCode = "400", description = "Bad request (e.g., validation errors)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data\" }"))),
            @ApiResponse(responseCode = "404", description = "Resource not found (e.g., reset code not found)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Reset code not found\" }"))),
            @ApiResponse(responseCode = "409", description = "Conflict (e.g., new password and confirmation do not match)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"New password and confirmation do not match\" }")))
    })
    @Operation(summary = "Reset user password",
    description = "This endpoint allows a user to reset their password using a reset code",
    requestBody = @RequestBody(required = true))
    ResponseEntity<SuccessResponse> resetPassword(@Validated @org.springframework.web.bind.annotation.RequestBody ResetPasswordRequest resetPasswordRequest);

}
