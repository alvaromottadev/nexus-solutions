package com.nexus.openapi;

import com.nexus.dto.Reports.MostTradedProductsResponse;
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

import java.util.List;

@Tag(name = "Report")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface ReportControllerOpenApi {

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                         description = "Most traded products retrieved successfully",
                         content = @Content(mediaType = "application/json", schema = @Schema(implementation = MostTradedProductsResponse.class, example = "\"[{\\\"productName\\\": \\\"Product A\\\", \\\"quantity\\\": 10}]\""))),
    })
    @Operation(
            summary = "Get most traded products",
            description = "Retrieves a list of the most traded products for the authenticated user's company."
    )
    ResponseEntity<List<MostTradedProductsResponse>> getMostTradedProducts(@AuthenticationPrincipal UserDetailsImpl userDetails);

}
