package com.nexus.service;

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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final LocationService locationService;
    private final QrCodeGeneratorService qrCodeGeneratorService;
    private final StorageService storageService;

    public ProductService(ProductRepository productRepository, LocationService locationService, QrCodeGeneratorService qrCodeGeneratorService, StorageService storageService) {
        this.productRepository = productRepository;
        this.locationService = locationService;
        this.qrCodeGeneratorService = qrCodeGeneratorService;
        this.storageService = storageService;
    }

    @Transactional
    public ProductResponse createProduct(MultipartFile file, ProductRequest productRequest, Company company) {

        Product product = new Product(productRequest, company);
        if (file != null && !file.isEmpty()){
            String imageUrl = storageService.uploadImage(file, UUID.randomUUID().toString());
            product.setImage(imageUrl);
        }
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

    public List<ProductResponse> getAllProducts(String locationId, String code, Company company, String name, Integer size, Integer page) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Location location = null;
        if (locationId != null) {
            location = locationService.findByIdAndCompany(locationId, company);
        }
        return productRepository.findAll(ProductSpecification.filterBy(location, code, name, company), pageable)
                .stream()
                .map(ProductResponse::new).toList();
    }


    @Transactional
    public ProductResponse updateProduct(String productId, MultipartFile file, ProductUpdateRequest productRequest, Company company) {
        Product product = findByIdAndCompany(productId, company);
        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setUpdatedAt(LocalDateTime.now());
        if (file != null && !file.isEmpty()){
            String newImage = storageService.uploadImage(file, product.getImage().split("/")[3]);
            product.setImage(newImage);
        }
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
