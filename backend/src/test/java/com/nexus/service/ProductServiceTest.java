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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;
    @Mock
    private LocationService locationService;
    @Mock
    private QrCodeGeneratorService qrCodeGeneratorService;
    @Mock
    private StorageService storageService;
    @Mock
    private MessageUtils messageUtils;
    @Mock
    private MultipartFile multipartFile;

    private Company companyMock;
    private Product productMock;
    private ProductRequest productRequestMock;
    private ProductUpdateRequest productUpdateRequestMock;
    private Location locationMock;
    private String codeMock;

    @BeforeEach
    void setUp() {
        String productId = UUID.randomUUID().toString();
        companyMock = mock(Company.class);
        productRequestMock = new ProductRequest("Test Product", "Description");
        productUpdateRequestMock = new ProductUpdateRequest("Updated Product", "New description", "CODE456");
        productMock = new Product(productRequestMock, companyMock, codeMock);
        productMock.setId(productId);
        locationMock = mock(Location.class);
        codeMock = "123412341234";
    }

    @DisplayName("Should create product successfully")
    @Test
    void createProductCase1() {
        when(productRepository.save(any(Product.class))).thenReturn(productMock);
        when(qrCodeGeneratorService.generateQrCode(any())).thenReturn("qrCodeUrl");
        ProductResponse actual = productService.createProduct(productRequestMock, companyMock);
        assertNotNull(actual);
        assertEquals(productRequestMock.name(), actual.name());
        assertEquals("qrCodeUrl", actual.qrCode());
        verify(productRepository).save(any(Product.class));
        verify(qrCodeGeneratorService).generateQrCode(any());
    }

    @DisplayName("Should return product by id")
    @Test
    void getProductByIdCase1() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull(productMock.getId(), companyMock)).thenReturn(Optional.of(productMock));
        ProductResponse actual = productService.getProductById(productMock.getId(), companyMock);
        assertNotNull(actual);
        assertEquals(productMock.getId(), actual.id());
    }

    @DisplayName("Should throw ProductNotFoundException when product not found")
    @Test
    void getProductByIdCase2() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull("notfound", companyMock)).thenReturn(Optional.empty());
        assertThrows(ProductNotFoundException.class, () -> productService.getProductById("notfound", companyMock));
    }

    @DisplayName("Should return paginated products with location filter")
    @Test
    void getAllProductsCase1() {
        String locationId = UUID.randomUUID().toString();
        int size = 10, page = 0;
        PageRequest pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        List<Product> products = List.of(productMock);
        Page<Product> productPage = new PageImpl<>(products, pageable, 1);
        when(locationService.findByIdAndCompany(locationId, companyMock)).thenReturn(locationMock);
        try (MockedStatic<ProductSpecification> productSpecification = mockStatic(ProductSpecification.class)) {
            @SuppressWarnings("unchecked")
            Specification<Product> spec = mock(Specification.class);
            productSpecification.when(() -> ProductSpecification.filterBy(locationMock, null, null, companyMock)).thenReturn(spec);
            when(productRepository.findAll(spec, pageable)).thenReturn(productPage);
            Page<ProductResponse> result = productService.getAllProducts(locationId, null, companyMock, null, size, page);
            assertNotNull(result);
            assertEquals(1, result.getTotalElements());
        }
    }

    @DisplayName("Should return paginated products without location filter")
    @Test
    void getAllProductsCase2() {
        int size = 10, page = 0;
        PageRequest pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        List<Product> products = List.of(productMock);
        Page<Product> productPage = new PageImpl<>(products, pageable, 1);
        try (MockedStatic<ProductSpecification> productSpecification = mockStatic(ProductSpecification.class)) {
            @SuppressWarnings("unchecked")
            Specification<Product> spec = mock(Specification.class);
            productSpecification.when(() -> ProductSpecification.filterBy(null, null, null, companyMock)).thenReturn(spec);
            when(productRepository.findAll(spec, pageable)).thenReturn(productPage);
            Page<ProductResponse> result = productService.getAllProducts(null, null, companyMock, null, size, page);
            assertNotNull(result);
            assertEquals(1, result.getTotalElements());
        }
    }

    @DisplayName("Should update product successfully")
    @Test
    void updateProductCase1() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull(productMock.getId(), companyMock)).thenReturn(Optional.of(productMock));
        when(productRepository.save(productMock)).thenReturn(productMock);
        ProductResponse actual = productService.updateProduct(productMock.getId(), productUpdateRequestMock, companyMock);
        assertNotNull(actual);
        assertEquals(productUpdateRequestMock.name(), actual.name());
        verify(productRepository).save(productMock);
    }

    @DisplayName("Should throw ProductNotFoundException when updating non-existent product")
    @Test
    void updateProductCase2() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull("notfound", companyMock)).thenReturn(Optional.empty());
        assertThrows(ProductNotFoundException.class, () -> productService.updateProduct("notfound", productUpdateRequestMock, companyMock));
    }

    @DisplayName("Should update product image successfully")
    @Test
    void updateProductImageCase1() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull(productMock.getId(), companyMock)).thenReturn(Optional.of(productMock));
        when(multipartFile.isEmpty()).thenReturn(false);
        when(storageService.uploadImage(any(), any())).thenReturn("imageUrl");
        when(productRepository.save(productMock)).thenReturn(productMock);
        ImageResponse actual = productService.updateProductImage(productMock.getId(), multipartFile, companyMock);
        assertNotNull(actual);
        assertEquals("imageUrl", actual.avatar());
        assertEquals("imageUrl", productMock.getImage());
    }

    @DisplayName("Should throw FileEmptyOrNullException when updating with null or empty image")
    @Test
    void updateProductImageCase2() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull(productMock.getId(), companyMock)).thenReturn(Optional.of(productMock));
        when(multipartFile.isEmpty()).thenReturn(true);
        assertThrows(FileEmptyOrNullException.class, () -> productService.updateProductImage(productMock.getId(), multipartFile, companyMock));
    }

    @DisplayName("Should delete product successfully")
    @Test
    void deleteProductCase1() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull(productMock.getId(), companyMock)).thenReturn(Optional.of(productMock));
        when(productRepository.save(productMock)).thenReturn(productMock);
        when(messageUtils.getMessage("product.deleted.success")).thenReturn("Product deleted successfully");
        SuccessResponse actual = productService.deleteProduct(productMock.getId(), companyMock);
        assertNotNull(actual);
        assertEquals("Product deleted successfully", actual.success());
        assertNotNull(productMock.getDeletedAt());
        verify(productRepository).save(productMock);
    }

    @DisplayName("Should throw ProductNotFoundException when deleting non-existent product")
    @Test
    void deleteProductCase2() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull("notfound", companyMock)).thenReturn(Optional.empty());
        assertThrows(ProductNotFoundException.class, () -> productService.deleteProduct("notfound", companyMock));
    }

    @DisplayName("Should return products with low stock")
    @Test
    void getProductsWithLowStockCase1() {
        when(productRepository.findAllWithLowStock(companyMock)).thenReturn(List.of(productMock));
        List<ProductResponse> result = productService.getProductsWithLowStock(companyMock);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(productMock.getName(), result.getFirst().name());
    }

    @DisplayName("Should return all products for the company")
    @Test
    void getAllProductsCase3() {
        try (MockedStatic<ProductSpecification> productSpecification = mockStatic(ProductSpecification.class)) {
            @SuppressWarnings("unchecked")
            Specification<Product> spec = mock(Specification.class);
            productSpecification.when(() -> ProductSpecification.filterBy(null, null, null, companyMock)).thenReturn(spec);
            when(productRepository.findAll(spec)).thenReturn(List.of(productMock));
            List<ProductResponse> actual = productService.getAllProducts(companyMock);
            assertNotNull(actual);
            assertEquals(1, actual.size());
            assertEquals(productMock.getName(), actual.getFirst().name());
        }
    }

    @DisplayName("Should return total products in stock")
    @Test
    void getTotalProductsInStockCase1() {
        when(productRepository.getTotalProductsInStock(companyMock)).thenReturn(42);
        Integer total = productService.getTotalProductsInStock(companyMock);
        assertEquals(42, total);
    }

    @DisplayName("Should return product quantity by name")
    @Test
    void getProductQuantityCase1() {
        when(productRepository.getProductQuantity("Test Product", companyMock)).thenReturn(Optional.of(5));
        Integer qtd = productService.getProductQuantity("Test Product", companyMock);
        assertEquals(5, qtd);
    }

    @DisplayName("Should return zero if product not found by name")
    @Test
    void getProductQuantityCase2() {
    when(productRepository.getProductQuantity("Nonexistent", companyMock)).thenReturn(Optional.empty());
    Integer qtd = productService.getProductQuantity("Nonexistent", companyMock);
    assertEquals(0, qtd);
    }

    @DisplayName("Should find product by id and company")
    @Test
    void findByIdAndCompanyCase1() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull(productMock.getId(), companyMock)).thenReturn(Optional.of(productMock));
        Product actual = productService.findByIdAndCompany(productMock.getId(), companyMock);
        assertNotNull(actual);
        assertEquals(productMock, actual);
    }

    @DisplayName("Should throw ProductNotFoundException when finding by id and company and not found")
    @Test
    void findByIdAndCompanyCase2() {
        when(productRepository.findByIdAndCompanyAndDeletedAtIsNull("notfound", companyMock)).thenReturn(Optional.empty());
        assertThrows(ProductNotFoundException.class, () -> productService.findByIdAndCompany("notfound", companyMock));
    }
}
