package com.embediq.server.payment;

import com.embediq.server.bots.repo.BotRepo;
import com.embediq.server.logs.LogService;
import com.embediq.server.plans.enums.PlanType;
import com.embediq.server.users.repo.UserRepo;
import com.embediq.server.users.service.UserService;
import com.embediq.server.utils.MyMailSender;
import com.stripe.exception.StripeException;
import com.stripe.model.Plan;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Autowired
    private UserService userService;

    @Autowired
    private MyMailSender sender;

    @Autowired
    private LogService logService;

    public Session createCheckoutSession(long amountInRupees, String planName, String mail) throws Exception {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:5173/cancel")

                // 📝 STORE CUSTOM DATA HERE (Metadata)
                .putMetadata("user_email", mail)
                .putMetadata("plan_type", planName)

                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("inr")
                                                .setUnitAmount(amountInRupees)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                // You still need a display name for the Stripe UI
                                                                .setName(planName)
                                                                .build())
                                                .build())
                                .build())
                .build();

        return Session.create(params);
    }


    public Boolean fulfilOrder(String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);
            if ("paid".equals(session.getPaymentStatus())) {
                String mail = session.getMetadata().get("user_email");
                String plan = session.getMetadata().get("plan_type");
                 // update user plan her
                 PlanType planEnum = PlanType.valueOf(plan);
                 userService.UpdateUserPlan(mail,planEnum);
                 sender.sendWelcomeEmail(mail,"plan upgrader successfully enjoy " +  plan + " now");
                 logService.saveLog(mail,"PLAN_UPGRADE","plan upgrade successfully");
                return userService.UpdateUserPlan(mail, planEnum);
            }
            return false;
        } catch (StripeException e) {
            System.err.println("Stripe error: " + e.getMessage());
            return false;
        }
    }

}
