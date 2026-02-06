package com.embediq.server.utils;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MyMailSender {

    // Add this to your Railway Variables as RESEND_API_KEY
    @Value("${RESEND_API_KEY}")
    private String resendApiKey;

    public void sendWelcomeEmail(String to, String subject) {
        // Initialize Resend with your API Key
        Resend resend = new Resend(resendApiKey);

        String htmlBody = "<html>" +
                "<body style='margin: 0; padding: 0; background-color: #f9f9f9; font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;'>" +
                "  <table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
                "    <tr>" +
                "      <td align='center' style='padding: 40px 0;'>" +
                "        <div style='max-width: 600px; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 40px; border-radius: 8px; text-align: left; box-shadow: 0 4px 6px rgba(0,0,0,0.05);'>" +
                "          <img src='https://ik.imagekit.io/liteSocial/Screenshot_from_2026-02-03_10-51-44-removebg-preview.png' alt='EmbedIQ' style='width: 140px; height: auto; display: block; margin-bottom: 30px;' />" +
                "          " +
                "          <h2 style='color: #000000; font-size: 24px; font-weight: 700; margin-bottom: 20px;'>Hello!</h2>" +
                "          " +
                "          <p style='color: #333333; font-size: 16px; line-height: 1.6;'>Regarding your inquiry: <strong style='color: #000000;'>" + subject + "</strong></p>" +
                "          " +
                "          <p style='color: #333333; font-size: 16px; line-height: 1.6;'>Welcome to <b>EmbedIQ</b>. We are thrilled to have you join our platform. Be the future ! </p>" +
                "          " +
                "          <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;'>" +
                "            <p style='font-size: 12px; color: #999999; margin: 0;'>© 2026 EmbedIQ. All rights reserved.</p>" +
                "            <p style='font-size: 12px; color: #999999; margin: 5px 0 0;'>You received this email because you signed up on our website.</p>" +
                "          </div>" +
                "        </div>" +
                "      </td>" +
                "    </tr>" +
                "  </table>" +
                "</body>" +
                "</html>";

        // Create the email parameters
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("embediqq@gmail.com") // Once you verify your domain, change this to hello@embediq.in
                .to(to)
                .subject(subject)
                .html(htmlBody)
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
            System.out.println("Email sent successfully! ID: " + data.getId());
        } catch (Exception e) {
            // Keeps the same exception behavior you had before
            throw new RuntimeException("Email failed to send via Resend", e);
        }
    }
}