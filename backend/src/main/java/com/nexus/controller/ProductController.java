package com.nexus.controller;

import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.dto.Product.ProductUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Product;
import com.nexus.model.User;
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

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@AuthenticationPrincipal UserDetailsImpl userDetails, @Validated @RequestBody ProductRequest productRequest) {
        ProductResponse response = productService.createProduct(productRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String productId){
        ProductResponse response = productService.getProductById(productId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public/{publicId}")
    public ResponseEntity<ProductResponse> getProductByPublicId(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable String publicId) {
        ProductResponse response = productService.getProductByPublicId(publicId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                @RequestParam(required = false) String locationId,
                                                                @RequestParam(required = false) String code) {
        List<ProductResponse> response = productService.getAllProducts(locationId, code, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponse> updateProduct(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                         @PathVariable String productId,
                                                         @Validated @RequestBody ProductUpdateRequest productRequest) {
        ProductResponse response = productService.updateProduct(productId, productRequest, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @DeleteMapping("/{productId}")
    public ResponseEntity<SuccessResponse> deleteProduct(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                         @PathVariable String productId) {
        SuccessResponse response = productService.deleteProduct(productId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
