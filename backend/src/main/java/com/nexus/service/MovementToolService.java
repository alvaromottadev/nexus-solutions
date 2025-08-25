package com.nexus.service;

import com.nexus.dto.MovementTool.MovementToolResponse;
import com.nexus.model.Company;
import com.nexus.model.MovementTool;
import com.nexus.model.Product;
import com.nexus.repository.MovementToolRepository;
import com.nexus.utils.MessageUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovementToolService {

    private final MovementToolRepository movementToolRepository;
    private final MessageUtils messageUtils;
    private final ProductService productService;

    public MovementToolService(MovementToolRepository movementToolRepository, MessageUtils messageUtils, ProductService productService) {
        this.movementToolRepository = movementToolRepository;
        this.messageUtils = messageUtils;
        this.productService = productService;
    }

    @Transactional
    public MovementToolResponse movementTool(String code, Company company) {
        MovementTool lastMovementTool = this.findOrCreate(code, company);
        MovementTool newMovementTool = new MovementTool(lastMovementTool);
        movementToolRepository.save(newMovementTool);
        return new MovementToolResponse(newMovementTool);
    }

    public List<MovementToolResponse> getMovementsTool(Company company){
        return movementToolRepository.findAllByProductCompanyOrderByMovementedAtDesc(company)
                .stream()
                .map(MovementToolResponse::new)
                .toList();
    }

    public MovementTool findOrCreate(String code, Company company) {
        Optional<MovementTool> movementTool = movementToolRepository.findFirstByProductCode(code);
        if (movementTool.isPresent()) return movementTool.get();
        Product product = productService.findByCodeAndCompany(code, company);
        return new MovementTool(product);
    }

}
