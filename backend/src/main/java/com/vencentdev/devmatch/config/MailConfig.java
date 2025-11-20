// java
package com.vencentdev.devmatch.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Value("${spring.mail.host:}")
    private String host;

    @Value("${spring.mail.port:25}")
    private int port;

    @Value("${spring.mail.username:}")
    private String username;

    @Value("${spring.mail.password:}")
    private String password;

    @Value("${spring.mail.protocol:smtp}")
    private String protocol;

    @Value("${spring.mail.properties.mail.smtp.auth:false}")
    private boolean smtpAuth;

    @Value("${spring.mail.properties.mail.smtp.starttls.enable:false}")
    private boolean starttls;

    @Bean
    @ConditionalOnMissingBean(JavaMailSender.class)
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        if (host != null && !host.isBlank()) {
            mailSender.setHost(host);
            mailSender.setPort(port);
            mailSender.setUsername(username);
            mailSender.setPassword(password);
            mailSender.setProtocol(protocol);

            Properties props = mailSender.getJavaMailProperties();
            props.put("mail.transport.protocol", protocol);
            props.put("mail.smtp.auth", String.valueOf(smtpAuth));
            props.put("mail.smtp.starttls.enable", String.valueOf(starttls));
        }
        return mailSender;
    }
}
