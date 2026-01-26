package com.mishal.ecommerce.controller;

import com.mishal.ecommerce.service.GreetingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {


    private final GreetingService greetingService;

    public HelloController(GreetingService greetingService){
        this.greetingService = greetingService;
    }


    @GetMapping("/hello")
    public Map<String, String> hello(){
        String message = greetingService.getGreeting();
        return Map.of(
                "status", "RUNNING",
                "application",message
                );
    }
}
