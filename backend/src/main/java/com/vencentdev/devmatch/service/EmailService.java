// java
package com.vencentdev.devmatch.service;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
}
