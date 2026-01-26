package com.mishal.ecommerce.event;

public class ProductImageUploadedEvent {

    private final Long productId;
    private final String imagePath;

    public ProductImageUploadedEvent(Long productId, String imagePath) {
        this.productId = productId;
        this.imagePath = imagePath;
    }

    public Long getProductId() {
        return productId;
    }

    public String getImagePath() {
        return imagePath;
    }
}
