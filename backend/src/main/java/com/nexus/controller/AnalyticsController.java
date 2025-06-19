package com.nexus.controller;

import com.nexus.dto.Analytics.TopProductsMovimentationsResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public ResponseEntity<List<TopProductsMovimentationsResponse>> getTopProductsMovimentations(@AuthenticationPrincipal UserDetailsImpl userDetails){
        List<TopProductsMovimentationsResponse> response = analyticsService.getTopProductsMovimentations(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
