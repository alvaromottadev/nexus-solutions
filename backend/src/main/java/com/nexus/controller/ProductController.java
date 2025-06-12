package com.nexus.controller;

import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@AuthenticationPrincipal UserDetailsImpl userDetails, @Validated @RequestBody ProductRequest productRequest) {
        ProductResponse response = productService.createProduct(productRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

}
