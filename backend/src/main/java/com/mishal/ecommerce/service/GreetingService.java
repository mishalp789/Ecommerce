package com.mishal.ecommerce.service;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String getGreeting(){
        return "Welcome to the E-Commerce Platform";
    }
}
