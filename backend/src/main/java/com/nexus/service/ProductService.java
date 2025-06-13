package com.nexus.service;

import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.dto.Product.ProductUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.model.Product;
import com.nexus.repository.ProductRepository;
import com.nexus.repository.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        Product product = new Product(productRequest.name(), productRequest.qrCode(), productRequest.description(), company);
        productRepository.save(product);
        return new ProductResponse(product, new CompanyResponse(company));
    }

    public ProductResponse getProductById(String productId, Company company){
        Product product = findByIdAndCompany(productId, company);
        return new ProductResponse(product, new CompanyResponse(company));
    }

    @Transactional
    public ProductResponse updateProduct(String productId, ProductUpdateRequest productRequest, Company company) {
        Product product = findByIdAndCompany(productId, company);
        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
        return new ProductResponse(product, new CompanyResponse(company));
    }

    @Transactional
    public SuccessResponse deleteProduct(String productId, Company company) {
        Product product = findByIdAndCompany(productId, company);
        productRepository.delete(product);
        return new SuccessResponse("Product deleted successfully");
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
