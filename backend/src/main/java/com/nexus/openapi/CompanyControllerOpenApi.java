package com.nexus.openapi;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Company.CompanyUpdateRequest;
import com.nexus.dto.ErrorResponse;
import com.nexus.dto.ImageResponse;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Company")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface CompanyControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Company retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = CompanyResponse.class))),
            @ApiResponse(responseCode = "404", description = "Company not found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Company not found.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Get my company", description = "Retrieves the company associated with the authenticated user.")
    ResponseEntity<CompanyResponse> getMyCompany(@AuthenticationPrincipal UserDetailsImpl userDetails);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Company updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = CompanyResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid input data",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized (e.g., password incorrect)",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Password incorrect.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "409", description = "Conflict - Email already exists",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Email already exists.\" }")))
    })
    @Operation(summary = "Update company information", description = "Updates the company information for the authenticated user.")
    ResponseEntity<CompanyResponse> updateCompany(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @Validated @RequestBody CompanyUpdateRequest companyUpdateRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Company logo updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ImageResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid file format or size",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid file format or size.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Update company logo",
            description = "Updates the logo of the company associated with the authenticated user.")
    ResponseEntity<ImageResponse> updateCompanyLogo(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @RequestPart("logo") MultipartFile file);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Company deleted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"message\": \"Company deleted successfully\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Delete company", description = "Deletes the company associated with the authenticated user.")
    ResponseEntity<SuccessResponse> deleteCompany(@AuthenticationPrincipal UserDetailsImpl userDetails);

}
