package com.nexus.openapi;

import com.nexus.dto.ErrorResponse;
import com.nexus.dto.ImageResponse;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.dto.Product.ProductUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.SecurityConfig;
import com.nexus.infra.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Product", description = "Operations related to product management")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface ProductControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Create product", description = "Creates a new product for the authenticated user's company.")
    ResponseEntity<ProductResponse> createProduct(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @Validated @RequestBody ProductRequest productRequest
    );


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Product not found.\" }")))
    })
    @Operation(summary = "Get product by ID", description = "Retrieves a product by its ID.")
    ResponseEntity<ProductResponse> getProductById(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String productId);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product retrieved successfully by public ID",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Product not found.\" }")))
    })
    @Operation(summary = "Get product by public ID", description = "Retrieves a product by its public ID.")
    ResponseEntity<ProductResponse> getProductByPublicId(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String publicId);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of products retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductResponse.class, example = "\"{\\n  \\\"content\\\": [\\n    {\\n      \\\"id\\\": \\\"string\\\",\\n      \\\"name\\\": \\\"string\\\",\\n      \\\"description\\\": \\\"string\\\",\\n      \\\"image\\\": \\\"string\\\",\\n      \\\"qrCode\\\": \\\"string\\\",\\n      \\\"code\\\": \\\"string\\\",\\n      \\\"createdAt\\\": \\\"2023-10-01T00:00:00Z\\\",\\n      \\\"updatedAt\\\": \\\"2023-10-01T00:00:00Z\\\"\\n    }\\n  ],\\n  \\\"pageable\\\": {\\n    \\\"pageNumber\\\": 0,\\n    \\\"pageSize\\\": 10,\\n    \\\"sort\\\": {\\n      \\\"empty\\\": false,\\n      \\\"sorted\\\": true,\\n      \\\"unsorted\\\": false\\n    },\\n    \\\"offset\\\": 0,\\n    \\\"paged\\\": true,\\n    \\\"unpaged\\\": false\\n  },\\n  \\\"last\\\": true,\\n  \\\"totalPages\\\": 1,\\n  \\\"totalElements\\\": 1,\\n  \\\"size\\\": 10,\\n  \\\"number\\\": 0,\\n  \\\"sort\\\": {\\n    \\\"empty\\\": false,\\n    \\\"sorted\\\": true,\\n    \\\"unsorted\\\": false\\n  },\\n  \\\"numberOfElements\\\": 1,\\n  \\\"first\\\": true,\\n  \\\"empty\\\": false\\n}\"\n"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content())
    })
    @Operation(summary = "Get all products", description = "Retrieves a paginated list of products for the authenticated user's company.")
    ResponseEntity<Page<ProductResponse>> getAllProducts(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) String locationId,
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String name,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "0") Integer page);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Product not found.\" }")))
    })
    @Operation(summary = "Update product", description = "Updates an existing product by its ID.")
    ResponseEntity<ProductResponse> updateProduct(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @PathVariable String productId,
                                                  @Validated @RequestBody ProductUpdateRequest productUpdateRequest
    );


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product image updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ImageResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"File is empty or null..\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Product not found.\" }")))
    })
    @Operation(summary = "Update product image", description = "Updates the image of a product by its ID.")
    ResponseEntity<ImageResponse> updateProductImage(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                     @PathVariable String productId,
                                                     @RequestParam("image") MultipartFile image);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product deleted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"message\": \"Product deleted successfully.\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - (e.g., token expired)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Token expired.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Product not found.\" }")))
    })
    @Operation(summary = "Delete product", description = "Deletes a product by its ID.")
    ResponseEntity<SuccessResponse> deleteProduct(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String productId);

}