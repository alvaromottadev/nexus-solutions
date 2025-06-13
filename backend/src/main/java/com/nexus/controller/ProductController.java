package com.nexus.controller;

import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Product;
import com.nexus.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('COMPANY') or hasRole('MANAGER')")
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@AuthenticationPrincipal UserDetailsImpl userDetails, @Validated @RequestBody ProductRequest productRequest) {
        ProductResponse response = productService.createProduct(productRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String id){
        ProductResponse response = productService.getProductById(id, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                @RequestParam(required = false) String locationId) {
        List<ProductResponse> response = productService.getAllProducts(locationId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
