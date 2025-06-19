package com.nexus.service;

import com.nexus.dto.Analytics.TopProductsMovimentationsResponse;
import com.nexus.model.Company;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    private final MovementItemService movementItemService;

    public AnalyticsService(MovementItemService movementItemService) {
        this.movementItemService = movementItemService;
    }

    public List<TopProductsMovimentationsResponse> getTopProductsMovimentations(Company company) {
        return movementItemService.getTopProductsMovimentations(company);
    }

}
