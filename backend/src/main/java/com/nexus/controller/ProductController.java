package com.nexus.controller;

import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.dto.Product.ProductUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Product;
import com.nexus.model.User;
import com.nexus.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> createProduct(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                           @RequestPart(value = "file", required = false) MultipartFile file,
                                           @RequestPart(value = "name") String name,
                                           @RequestPart(value = "description", required = false) String description,
                                           @RequestPart(value = "code", required = false) String code
    ) {
        ProductResponse response = productService.createProduct(file, new ProductRequest(name, description, code), userDetails.getCompany());
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
                                                                @RequestParam(required = false) String code,
                                                                @RequestParam(required = false) String name,
                                                                @RequestParam(required = false, defaultValue = "10") Integer size,
                                                                @RequestParam(required = false, defaultValue = "0") Integer page) {
        List<ProductResponse> response = productService.getAllProducts(locationId, code, userDetails.getCompany(), name, size, page);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PutMapping(path = "/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> updateProduct(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                         @PathVariable String productId,
                                                         @RequestPart(value = "file", required = false) MultipartFile file,
                                                         @RequestPart(value = "name") String name,
                                                         @RequestPart(value = "description", required = false) String description,
                                                         @RequestPart(value = "code", required = false) String code
    ) {
        ProductResponse response = productService.updateProduct(productId, file, new ProductUpdateRequest(name, description, code), userDetails.getCompany());
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
