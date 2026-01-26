package com.mishal.ecommerce.event.listener;


import com.mishal.ecommerce.event.ProductCreatedEvent;
import com.mishal.ecommerce.event.ProductImageUploadedEvent;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;



@Component
public class ProductEventListener {

    private static final Logger log = LoggerFactory.getLogger(ProductEventListener.class);

    @Async
    @EventListener
    public void handleProductCreated(ProductCreatedEvent event){
        log.info("EVENT: Product created → id={}, name={}",
                event.getProductId(), event.getProductName());
    }
    @Async
    @EventListener
    public void handleProductImageUploaded(ProductImageUploadedEvent event){
        log.info("EVENT: Product image uploaded → productId={}, image={}",
                event.getProductId(), event.getImagePath());
    }
}
