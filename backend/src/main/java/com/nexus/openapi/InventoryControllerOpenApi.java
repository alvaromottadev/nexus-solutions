package com.nexus.openapi;

import com.nexus.dto.ErrorResponse;
import com.nexus.dto.Inventory.InventoryCreateRequest;
import com.nexus.dto.Inventory.InventoryResponse;
import com.nexus.dto.Inventory.InventoryUpdateRequest;
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
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Tag(name = "Inventory")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface InventoryControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Inventory created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryResponse.class))),
            @ApiResponse(responseCode = "404", description = "Location or Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Product not found\"}"))),
            @ApiResponse(responseCode = "409", description = "Inventory already exists",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Inventory already exists\"}"))),
            @ApiResponse(responseCode = "400", description = "Invalid data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Invalid request data\"}")))
    })
    @Operation(summary = "Create Inventory", description = "Creates a new Inventory for the authenticated company.")
    ResponseEntity<InventoryResponse> createInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                      @Validated @RequestBody InventoryCreateRequest inventoryCreateRequest);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Inventory retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryResponse.class))),
            @ApiResponse(responseCode = "404", description = "Inventory not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Inventory not found\"}")))
    })
    @Operation(summary = "Get Inventory by ID", description = "Retrieves an Inventory by its ID.")
    ResponseEntity<InventoryResponse> getInventoryById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                       @PathVariable String inventoryId);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of Inventories retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryResponse.class, example = "\"[\\n  {\\n    \\\"id\\\": \\\"string\\\",\\n    \\\"quantity\\\": 0,\\n    \\\"minStock\\\": 0,\\n    \\\"status\\\": \\\"OK\\\",\\n    \\\"createdAt\\\": \\\"2025-07-09T21:33:32.614Z\\\",\\n    \\\"updatedAt\\\": \\\"2025-07-09T21:33:32.614Z\\\",\\n    \\\"product\\\": {\\n      \\\"id\\\": \\\"string\\\",\\n      \\\"name\\\": \\\"string\\\",\\n      \\\"description\\\": \\\"string\\\",\\n      \\\"image\\\": \\\"string\\\",\\n      \\\"qrCode\\\": \\\"string\\\",\\n      \\\"code\\\": \\\"string\\\",\\n      \\\"createdAt\\\": \\\"2025-07-09T21:33:32.614Z\\\",\\n      \\\"updatedAt\\\": \\\"2025-07-09T21:33:32.614Z\\\"\\n    },\\n    \\\"location\\\": {\\n      \\\"id\\\": \\\"string\\\",\\n      \\\"name\\\": \\\"string\\\",\\n      \\\"createdAt\\\": \\\"2025-07-09T21:33:32.614Z\\\",\\n      \\\"updatedAt\\\": \\\"2025-07-09T21:33:32.614Z\\\",\\n      \\\"address\\\": {\\n        \\\"id\\\": \\\"string\\\",\\n        \\\"street\\\": \\\"string\\\",\\n        \\\"number\\\": \\\"string\\\",\\n        \\\"complement\\\": \\\"string\\\",\\n        \\\"district\\\": \\\"string\\\",\\n        \\\"city\\\": \\\"string\\\",\\n        \\\"state\\\": \\\"string\\\",\\n        \\\"postalCode\\\": \\\"string\\\",\\n        \\\"country\\\": \\\"string\\\"\\n      }\\n    }\\n  }\\n]\"\n")))
    })
    @Operation(summary = "List all Inventories", description = "Retrieves all Inventories for the authenticated company.")
    ResponseEntity<List<InventoryResponse>> getAllInventories(@AuthenticationPrincipal UserDetailsImpl userDetails);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Inventory updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryResponse.class))),
            @ApiResponse(responseCode = "404", description = "Inventory not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Inventory not found\"}"))),
            @ApiResponse(responseCode = "400", description = "Invalid data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Invalid request data\"}")))
    })
    @Operation(summary = "Update Inventory", description = "Updates an existing Inventory.")
    ResponseEntity<InventoryResponse> updateInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                      @PathVariable String inventoryId,
                                                      @Validated @RequestBody InventoryUpdateRequest inventoryUpdateRequest);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Inventory deleted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{\"message\": \"Inventory deleted successfully\"}"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Inventory not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{\"message\": \"Inventory not found\"}")))
    })
    @Operation(summary = "Delete Inventory", description = "Deletes an Inventory by its ID.")
    ResponseEntity<SuccessResponse> deleteInventory(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @PathVariable String inventoryId);

}