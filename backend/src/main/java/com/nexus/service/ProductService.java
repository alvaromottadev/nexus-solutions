package com.nexus.service;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
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

}
