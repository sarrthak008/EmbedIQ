package com.embediq.server.payment;

import com.embediq.server.utils.ApiResponce;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> checkout(@RequestBody Map<String, Object> data) {
        try {
            long amount = Long.parseLong(data.get("amount").toString());
            String productName = (String) data.get("productName");
            String mail = (String) data.get("mail");
            Session session = stripeService.createCheckoutSession(amount, productName, mail);
            Map<String, String> response = new HashMap<>();
            response.put("url", session.getUrl());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/verify/{sessionId}")
    public ResponseEntity<ApiResponce<?>> verifyPayment(@PathVariable String sessionId) {
        try {
            Boolean isVerified = stripeService.fulfilOrder(sessionId);

            if (isVerified) {
                return ResponseEntity.ok(new ApiResponce<>(true, "Payment verified and plan upgraded successfully!", null));
            } else {
                return ResponseEntity.status(400)
                        .body(new ApiResponce<>(false, "Payment verification failed or pending.", null));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponce<>(false, "Server Error: " + e.getMessage(), null));
        }
    }
}