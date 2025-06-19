package com.nexus.service;

import com.nexus.dto.Analytics.TopProductsMovimentationsResponse;
import com.nexus.model.Company;
import com.nexus.repository.MovementItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovementItemService {

    private final MovementItemRepository movementItemRepository;

    public MovementItemService(MovementItemRepository movementItemRepository) {
        this.movementItemRepository = movementItemRepository;
    }

    public List<TopProductsMovimentationsResponse> getTopProductsMovimentations(Company company) {
        return movementItemRepository.findTopProducts(company);
    }

}
