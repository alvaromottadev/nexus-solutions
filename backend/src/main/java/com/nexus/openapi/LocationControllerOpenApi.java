package com.nexus.openapi;

import com.nexus.dto.ErrorResponse;
import com.nexus.dto.Location.LocationRequest;
import com.nexus.dto.Location.LocationResponse;
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
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "Location", description = "Operations related to location management")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface LocationControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Location created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LocationResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Create location", description = "Creates a new location for the authenticated user's company.")
    ResponseEntity<LocationResponse> createLocation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @Validated @RequestBody LocationRequest locationRequest);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Location retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LocationResponse.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Location not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Location not found.\" }"))),
    })
    @Operation(summary = "Get location by ID", description = "Retrieves a location by its ID.")
    ResponseEntity<LocationResponse> getLocationById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                     @PathVariable String locationId);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of locations retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LocationResponse.class, example = "\"{\\n  \\\"content\\\": [\\n    {\\n      \\\"id\\\": \\\"string\\\",\\n      \\\"name\\\": \\\"string\\\",\\n      \\\"createdAt\\\": \\\"2023-10-01T00:00:00Z\\\",\\n      \\\"updatedAt\\\": \\\"2023-10-01T00:00:00Z\\\",\\n      \\\"address\\\": {\\n        \\\"id\\\": \\\"string\\\",\\n        \\\"street\\\": \\\"string\\\",\\n        \\\"number\\\": \\\"string\\\",\\n        \\\"complement\\\": \\\"string\\\",\\n        \\\"district\\\": \\\"string\\\",\\n        \\\"city\\\": \\\"string\\\",\\n        \\\"state\\\": \\\"string\\\",\\n        \\\"postalCode\\\": \\\"string\\\",\\n        \\\"country\\\": \\\"string\\\"\\n      }\\n    }\\n  ],\\n  \\\"pageable\\\": {\\n    \\\"pageNumber\\\": 0,\\n    \\\"pageSize\\\": 10,\\n    \\\"sort\\\": {\\n      \\\"empty\\\": false,\\n      \\\"sorted\\\": true,\\n      \\\"unsorted\\\": false\\n    },\\n    \\\"offset\\\": 0,\\n    \\\"paged\\\": true,\\n    \\\"unpaged\\\": false\\n  },\\n  \\\"last\\\": true,\\n  \\\"totalPages\\\": 1,\\n  \\\"totalElements\\\": 1,\\n  \\\"size\\\": 10,\\n  \\\"number\\\": 0,\\n  \\\"sort\\\": {\\n    \\\"empty\\\": false,\\n    \\\"sorted\\\": true,\\n    \\\"unsorted\\\": false\\n  },\\n  \\\"numberOfElements\\\": 1,\\n  \\\"first\\\": true,\\n  \\\"empty\\\": false\\n}\"\n"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Get all locations", description = "Retrieves a paginated list of locations for the authenticated user's company.")
    ResponseEntity<Page<LocationResponse>> getAllLocations(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @RequestParam(required = false) String name,
                                                           @RequestParam(required = false, defaultValue = "5") Integer size,
                                                           @RequestParam(required = false, defaultValue = "0") Integer page);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Location updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LocationResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Location not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Location not found.\" }")))
    })
    @Operation(summary = "Update location", description = "Updates an existing location by its ID.")
    ResponseEntity<LocationResponse> updateLocation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @PathVariable String locationId,
                                                    @Validated @RequestBody LocationRequest locationRequest);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Location deleted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"message\": \"Location deleted successfully.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Location not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Location not found.\" }")))
    })
    @Operation(summary = "Delete location", description = "Deletes a location by its ID.")
    ResponseEntity<SuccessResponse> deleteLocation(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                   @PathVariable String locationId);
}