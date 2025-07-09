package com.nexus.openapi;

import com.nexus.dto.Oracle.AIRequest;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.infra.security.SecurityConfig;
import com.nexus.infra.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Oracle")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface OracleControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "AI response received successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AIResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = AIResponse.class, example = "{\"message\": \"Invalid input data\"}"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Ask a question to the Oracle AI",
               description = "Sends a question to the Oracle AI and returns the response.")
    AIResponse askQuestion(@Validated @RequestBody AIRequest aiRequest,
                           @AuthenticationPrincipal UserDetailsImpl userDetails);

}
