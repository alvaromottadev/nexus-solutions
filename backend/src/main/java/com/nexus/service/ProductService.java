package com.nexus.service;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Product;
import com.nexus.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest productRequest, Company company) {
        Product product = new Product(productRequest.name(), productRequest.description(), company);
        productRepository.save(product);
        return new ProductResponse(product, new CompanyResponse(company));
    }

    public ProductResponse getProductById(String id, Company company){
        Product product = findByIdAndCompany(id, company);
        return new ProductResponse(product, new CompanyResponse(company));
    }

    private Product findByIdAndCompany(String id, Company company){
        return productRepository.findByIdAndCompany(id, company)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

}
