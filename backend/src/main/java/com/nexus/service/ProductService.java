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
    private final QrCodeGeneratorService qrCodeGeneratorService;

    public ProductService(ProductRepository productRepository, LocationService locationService, QrCodeGeneratorService qrCodeGeneratorService) {
        this.productRepository = productRepository;
        this.locationService = locationService;
        this.qrCodeGeneratorService = qrCodeGeneratorService;
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest productRequest, Company company) {
        Product product = new Product(productRequest, company);

        String qrCodeUrl = qrCodeGeneratorService.generateQrCode(product.getPublicId());
        product.setQrCode(qrCodeUrl);

        productRepository.save(product);
        return new ProductResponse(product);
    }

    public ProductResponse getProductById(String productId, Company company){
        Product product = findByIdAndCompany(productId, company);
        return new ProductResponse(product);
    }

    public ProductResponse getProductByPublicId(String publicId, Company company) {
        Product product = findByPublicIdAndCompany(publicId, company);
        return new ProductResponse(product);
    }

    public List<ProductResponse> getAllProducts(String locationId, String code, Company company) {
        Location location = null;
        if (locationId != null) {
            location = locationService.findByIdAndCompany(locationId, company);
        }
        return productRepository.findAll(ProductSpecification.filterBy(location, code, company))
                .stream()
                .map(product -> new ProductResponse(product)).toList();
    }


    @Transactional
    public ProductResponse updateProduct(String productId, ProductUpdateRequest productRequest, Company company) {
        Product product = findByIdAndCompany(productId, company);
        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
        return new ProductResponse(product);
    }

    @Transactional
    public SuccessResponse deleteProduct(String productId, Company company) {
        Product product = findByIdAndCompany(productId, company);
        productRepository.delete(product);
        return new SuccessResponse("Product deleted successfully");
    }

    public Product findByIdAndCompany(String id, Company company){
        return productRepository.findByIdAndCompany(id, company)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private Product findByPublicIdAndCompany(String publicId, Company company) {
        return productRepository.findByPublicIdAndCompany(publicId, company)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

}
