package com.embediq.server.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripConfig {
    @Value("${stripe.secret.key}")
    private String secretKey;

    @PostConstruct
    public void setup() {
        if (secretKey == null || secretKey.isEmpty()) {
            throw new RuntimeException("STRIPE_SECRET_KEY is missing from application properties!");
        }
        Stripe.apiKey = secretKey;
        System.out.println("Stripe initialized with key starting with: " + secretKey.substring(0, 7));
    }
}
