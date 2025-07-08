package com.nexus.openapi;

import com.nexus.dto.Auth.AuthMeResponse;
import com.nexus.infra.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@Tag(name = "Authentication")
public interface AuthControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user information")
    })
    @Operation(summary = "Get current user information")
    ResponseEntity<AuthMeResponse> getMe(@AuthenticationPrincipal UserDetailsImpl userDetails);

}
