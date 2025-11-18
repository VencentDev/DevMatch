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
            String html = "<p>Please verify your email by clicking the link below:</p>"
                    + "<p><a href=\"" + link + "\">Verify email</a></p>";
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
