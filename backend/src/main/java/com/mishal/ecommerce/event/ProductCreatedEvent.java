package com.mishal.ecommerce.event;

public class ProductCreatedEvent {

    private final Long productId;
    private final String productName;

    public ProductCreatedEvent(Long productId, String productName) {
        this.productId = productId;
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }
}
