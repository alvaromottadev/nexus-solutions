package com.nexus.openapi;

import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.EmployeeUpdateByIdRequest;
import com.nexus.dto.Employee.EmployeeUpdateRequest;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.dto.ErrorResponse;
import com.nexus.dto.ImageResponse;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Employee")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface EmployeeControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Employee created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "409", description = "Conflict - Email already exists",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Email already exists.\" }"))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error - Unexpected error occurred",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Unexpected error occurred.\" }")))
    })
    @Operation(summary = "Create employee",
            description = "Creates a new employee for the authenticated user's company.",
            requestBody = @RequestBody(required = true,
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserEmployeeRegisterRequest.class, example = "{\n  \"user\": {\n    \"email\": \"string\",\n    \"password\": \"string\",\n    \"type\": \"EMPLOYEE\"\n  },\n  \"employee\": {\n    \"name\": \"string\",\n    \"role\": \"MANAGER\"\n  }\n}"))))
    ResponseEntity<EmployeeResponse> createEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @Validated @RequestBody UserEmployeeRegisterRequest employeeRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeResponse.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Employee not found.\" }"))),
    })
    @Operation(summary = "Get employee by ID", description = "Retrieves an employee by their ID.")
    ResponseEntity<EmployeeResponse> getEmployeeById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                     @PathVariable String employeeId);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeResponse.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Employee not found.\" }"))),
    })
    @Operation(summary = "Get current employee", description = "Retrieves the authenticated user's employee information.")
    ResponseEntity<EmployeeResponse> getMyEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of employees retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeResponse.class, example = "\"{\\n  \\\"content\\\": [\\n    {\\n      \\\"id\\\": \\\"string\\\",\\n      \\\"name\\\": \\\"string\\\",\\n      \\\"avatar\\\": \\\"string\\\",\\n      \\\"role\\\": \\\"MANAGER\\\",\\n      \\\"createdAt\\\": \\\"2023-10-01T00:00:00Z\\\",\\n      \\\"updatedAt\\\": \\\"2023-10-01T00:00:00Z\\\",\\n      \\\"user\\\": {\\n        \\\"id\\\": \\\"string\\\",\\n        \\\"email\\\": \\\"string\\\",\\n        \\\"type\\\": \\\"EMPLOYEE\\\"\\n      }\\n    }\\n  ],\\n  \\\"pageable\\\": {\\n    \\\"pageNumber\\\": 0,\\n    \\\"pageSize\\\": 10,\\n    \\\"sort\\\": {\\n      \\\"empty\\\": false,\\n      \\\"sorted\\\": true,\\n      \\\"unsorted\\\": false\\n    },\\n    \\\"offset\\\": 0,\\n    \\\"paged\\\": true,\\n    \\\"unpaged\\\": false\\n  },\\n  \\\"last\\\": true,\\n  \\\"totalPages\\\": 1,\\n  \\\"totalElements\\\": 1,\\n  \\\"size\\\": 10,\\n  \\\"number\\\": 0,\\n  \\\"sort\\\": {\\n    \\\"empty\\\": false,\\n    \\\"sorted\\\": true,\\n    \\\"unsorted\\\": false\\n  },\\n  \\\"numberOfElements\\\": 1,\\n  \\\"first\\\": true,\\n  \\\"empty\\\": false\\n}\"\n"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Get all employees", description = "Retrieves a paginated list of employees for the authenticated user's company. Sort by creation date in descending order.")
    ResponseEntity<Page<EmployeeResponse>> getAllEmployees(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @RequestParam(required = false) String name,
                                                           @RequestParam(required = false, defaultValue = "0") Integer page,
                                                           @RequestParam(required = false, defaultValue = "10") Integer size);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid password",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid password.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Employee not found.\" }"))),
            @ApiResponse(responseCode = "409", description = "Conflict - Email already exists",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Email already exists.\" }"))),

    })
    @Operation(summary = "Update employee", description = "Updates the authenticated user's employee information.")
    ResponseEntity<EmployeeResponse> updateEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                    @Validated @RequestBody EmployeeUpdateRequest employeeUpdateRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid input data.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Employee not found.\" }")))
    })
    @Operation(summary = "Update employee by ID", description = "Updates an employee's information by their ID.")
    ResponseEntity<EmployeeResponse> updateEmployeeById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                        @PathVariable String employeeId,
                                                        @Validated @RequestBody EmployeeUpdateByIdRequest employeeRequest);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee avatar updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ImageResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid file format or size",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid file format or size.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
    })
    @Operation(summary = "Update employee avatar", description = "Updates the authenticated user's employee avatar.")
    ResponseEntity<ImageResponse> updateEmployeeAvatar(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                       @RequestPart(value = "avatar") MultipartFile avatar);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee avatar updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ImageResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid file format or size",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Invalid file format or size.\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Employee not found.\" }")))
    })
    @Operation(summary = "Update employee avatar by ID", description = "Updates an employee's avatar by their ID.")
    ResponseEntity<ImageResponse> updateEmployeeAvatarById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @PathVariable String employeeId,
                                                           @RequestPart(value = "avatar") MultipartFile avatar);


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee deleted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class, example = "{ \"message\": \"Employee deleted successfully\" }"))),
            @ApiResponse(responseCode = "403", description = "Forbidden - User does not have permission to access this resource",
                    content = @Content()),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class, example = "{ \"error\": \"Employee not found.\" }")))
    })
    @Operation(summary = "Delete employee", description = "Deletes an employee by their ID.")
    ResponseEntity<SuccessResponse> deleteEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                   @PathVariable String employeeId);
}
