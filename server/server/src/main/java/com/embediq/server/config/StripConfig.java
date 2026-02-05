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
        // Sets the secret key globally for the Stripe library
        Stripe.apiKey = secretKey;
    }
}
