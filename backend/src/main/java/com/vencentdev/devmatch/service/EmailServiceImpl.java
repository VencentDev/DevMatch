// java
package com.vencentdev.devmatch.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    @Value("${app.frontend.base-url:http://localhost:3000}")
    private String frontendBaseUrl;

    @Value("${spring.mail.username}")
    private String from;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendVerificationEmail(String to, String token) {
        try {
            logger.info("Sending verification email to {}", to);
            String link = frontendBaseUrl + "/verify/" + token;
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            String html = "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Email Verification</title>\n" +
                    "    <style>\n" +
                    "        body { font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 0; }\n" +
                    "        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); border: 1px solid #e0e0e0; }\n" +
                    "        .header { text-align: center; padding: 20px 0; background-color: #8a2be2; color: #ffffff; border-radius: 8px 8px 0 0; }\n" +
                    "        .content { padding: 20px; text-align: center; color: #000000; }\n" +
                    "        .button { display: inline-block; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px; }\n" +
                    "        .footer { text-align: center; padding: 20px; font-size: 12px; color: #000000; }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"container\">\n" +
                    "        <div class=\"header\">\n" +
                    "            <h1>Verify Your Email Address</h1>\n" +
                    "        </div>\n" +
                    "        <div class=\"content\">\n" +
                    "            <p>Hello [User's Name],</p>\n" +
                    "            <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below.</p>\n" +
                    "            <a href=\""+link+"\" class=\"button\">Verify Email</a>\n" +
                    "            <p>If the button doesn't work, copy and paste this link into your browser: [Verification Link]</p>\n" +
                    "            <p>This link will expire in 24 hours.</p>\n" +
                    "        </div>\n" +
                    "        <div class=\"footer\">\n" +
                    "            <p>If you didn't request this, please ignore this email.</p>\n" +
                    "            <p>&copy; 2023 Your Company. All rights reserved.</p>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "</html>\n";
            helper.setText(html, true);
            helper.setTo(to);
            helper.setSubject("DevMatch - Verify your email");
            helper.setFrom(from);
            mailSender.send(message);
            logger.info("Verification email sent to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send verification email to {}", to, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
}
