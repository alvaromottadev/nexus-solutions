package com.nexus.controller;

import com.nexus.dto.Reports.MostTradedProductsResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.openapi.ReportControllerOpenApi;
import com.nexus.service.MovementItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController implements ReportControllerOpenApi {

    private final MovementItemService movementItemService;

    public ReportController(MovementItemService movementItemService) {
        this.movementItemService = movementItemService;
    }

    @GetMapping("/most-traded-products")
    public ResponseEntity<List<MostTradedProductsResponse>> getMostTradedProducts(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<MostTradedProductsResponse> response = movementItemService.getMostTradedProducts(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
