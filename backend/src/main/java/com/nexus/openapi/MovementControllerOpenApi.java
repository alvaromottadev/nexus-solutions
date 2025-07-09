package com.nexus.openapi;

import com.nexus.dto.ErrorResponse;
import com.nexus.dto.Movement.MovementRequest;
import com.nexus.dto.Movement.MovementResponse;
import com.nexus.infra.security.SecurityConfig;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.enums.MovementType;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Movement", description = "Operations related to movement management")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface MovementControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Movement created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MovementResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Invalid request data\"}"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Location or Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Location or Product not found\"}"))),

    })
    @Operation(summary = "Create Movement", description = "Creates a new movement for the authenticated company.")
    ResponseEntity<MovementResponse> createMovement(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @RequestBody(description = "Movement data", required = true,
                                                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = MovementRequest.class)))
                                                    MovementRequest movementRequest);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Movement retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MovementResponse.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Movement not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Movement not found\"}")))
    })
    @Operation(summary = "Get Movement by ID", description = "Retrieves a movement by its ID.")
    ResponseEntity<MovementResponse> getMovementById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                     @PathVariable String movementId);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of movements retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MovementResponse.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Get all Movements", description = "Retrieves all movements for the authenticated company, optionally filtered by type and date range.")
    ResponseEntity<List<MovementResponse>> getAllMovements(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @RequestParam(required = false) MovementType type,
                                                           @RequestParam(required = false)LocalDateTime startDate,
                                                           @RequestParam(required = false) LocalDateTime endDate);
}