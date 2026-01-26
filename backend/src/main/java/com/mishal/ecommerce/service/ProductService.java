package com.mishal.ecommerce.service;

import com.mishal.ecommerce.event.ProductCreatedEvent;
import com.mishal.ecommerce.event.ProductImageUploadedEvent;
import com.mishal.ecommerce.exception.ProductNotFoundException;
import com.mishal.ecommerce.model.Product;
import com.mishal.ecommerce.repository.ProductRepository;
import com.mishal.ecommerce.service.storage.FileStorageService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.context.ApplicationEventPublisher;
import io.micrometer.core.instrument.MeterRegistry;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final FileStorageService fileStorageService;
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    private final ApplicationEventPublisher eventPublisher;
    private final MeterRegistry meterRegistry;
    public ProductService(ProductRepository productRepository,FileStorageService fileStorageService,ApplicationEventPublisher eventPublisher,MeterRegistry meterRegistry){
        this.productRepository = productRepository;
        this.fileStorageService = fileStorageService;
        this.eventPublisher = eventPublisher;
        this.meterRegistry = meterRegistry;
    }


    @Cacheable(value = "products", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }


    @Cacheable(value = "product", key = "#id")
    public Product getProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public Page<Product> searchByName(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }



    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product addProduct(Product product){
        meterRegistry.counter("ecommerce.product.created").increment();
        log.info("Adding new product: name={}, price={}",
                product.getName(), product.getPrice());
        Product saved = productRepository.save(product);
        eventPublisher.publishEvent(
                new ProductCreatedEvent(saved.getId(), saved.getName())
        );
        return saved;
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product updateProduct(Long id, Product updatedProduct){
        log.info("Updating product id={}", id);
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());

        return productRepository.save(existingProduct);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public void deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            throw new ProductNotFoundException(id);
        }
        log.warn("Deleting product id={}", id);
        productRepository.deleteById(id);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product uploadProductImage(Long productId, MultipartFile file) {
        Product product = getProductById(productId);

        String filename = fileStorageService.store(file);
        product.setImagePath(filename);
        Product saved = productRepository.save(product);

        eventPublisher.publishEvent(
                new ProductImageUploadedEvent(saved.getId(),filename)
        );

        return saved;
    }

}
