package com.nexus.service;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.model.Product;
import com.nexus.repository.ProductRepository;
import com.nexus.repository.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final LocationService locationService;

    public ProductService(ProductRepository productRepository, LocationService locationService) {
        this.productRepository = productRepository;
        this.locationService = locationService;
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

    public List<ProductResponse> getAllProducts(String locationId, Company company) {
        Location location = null;
        if (locationId != null) {
            location = locationService.findByIdAndCompany(locationId, company);
        }
        return productRepository.findAll(ProductSpecification.filterBy(location, company))
                .stream()
                .map(product -> new ProductResponse(product, new CompanyResponse(company))).toList();
    }

    private Product findByIdAndCompany(String id, Company company){
        return productRepository.findByIdAndCompany(id, company)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

}
