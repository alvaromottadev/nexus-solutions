package com.nexus.service;

import com.nexus.dto.ImageResponse;
import com.nexus.dto.Product.ProductRequest;
import com.nexus.dto.Product.ProductResponse;
import com.nexus.dto.Product.ProductUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.FileEmptyOrNullException;
import com.nexus.exception.ProductNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.model.Product;
import com.nexus.repository.ProductRepository;
import com.nexus.repository.specification.ProductSpecification;
import com.nexus.utils.MessageUtils;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
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
    private final MessageUtils messageUtils;

    public ProductService(ProductRepository productRepository, LocationService locationService, QrCodeGeneratorService qrCodeGeneratorService, StorageService storageService, MessageUtils messageUtils) {
        this.productRepository = productRepository;
        this.locationService = locationService;
        this.qrCodeGeneratorService = qrCodeGeneratorService;
        this.storageService = storageService;
        this.messageUtils = messageUtils;
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest productRequest, Company company) {

        Product product = new Product(productRequest, company);
        String qrCodeUrl = qrCodeGeneratorService.generateQrCode(product.getId());
        product.setQrCode(qrCodeUrl);

        productRepository.save(product);
        return new ProductResponse(product);
    }

    public ProductResponse getProductById(String productId, Company company){
        Product product = findByIdAndCompany(productId, company);
        return new ProductResponse(product);
    }

    public Page<ProductResponse> getAllProducts(String locationId, String code, Company company, String name, Integer size, Integer page) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Location location = null;
        if (locationId != null) {
            location = locationService.findByIdAndCompany(locationId, company);
        }
        return productRepository.findAll(ProductSpecification.filterBy(location, code, name, company), pageable).map(ProductResponse::new);
    }

    @Transactional
    public ProductResponse updateProduct(String productId, ProductUpdateRequest productUpdateRequest, Company company) {
        Product product = findByIdAndCompany(productId, company);
        product.update(productUpdateRequest);
        productRepository.save(product);
        return new ProductResponse(product);
    }

    @Transactional
    public ImageResponse updateProductImage(String productId, MultipartFile image, Company company) {
        Product product = findByIdAndCompany(productId, company);
        if (image != null && !image.isEmpty()){
            String imageUrl = storageService.uploadImage(image, UUID.randomUUID().toString());
            product.setImage(imageUrl);
            productRepository.save(product);
            return new ImageResponse(imageUrl);
        }
        throw new FileEmptyOrNullException();
    }

    @Transactional
    public SuccessResponse deleteProduct(String productId, Company company) {
        Product product = findByIdAndCompany(productId, company);
        product.setDeletedAt(LocalDateTime.now());
        productRepository.save(product);
        return new SuccessResponse(messageUtils.getMessage("product.deleted.success"));
    }

    public List<ProductResponse> getProductsWithLowStock(Company company){
        List<Product> products = productRepository.findAllWithLowStock(company);
        return products.stream()
                .map(ProductResponse::new)
                .toList();
    }

    public List<ProductResponse> getAllProducts(Company company){
        List<Product> products = productRepository.findAll(ProductSpecification.filterBy(null, null, null, company));
        return products.stream()
                .map(ProductResponse::new)
                .toList();
    }

    public Integer getTotalProductsInStock(Company company){
        return productRepository.getTotalProductsInStock(company);
    }

    public Integer getProductQuantity(String productName, Company company){
        return productRepository.getProductQuantity(productName, company).orElse(0);
    }

    public Product findByIdAndCompany(String id, Company company){
        return productRepository.findByIdAndCompanyAndDeletedAtIsNull(id, company)
                .orElseThrow(ProductNotFoundException::new);
    }

}
