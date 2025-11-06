// java
package com.vencentdev.freelance.service;

import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.model.VerificationToken;
import com.vencentdev.freelance.repository.UserRepository;
import com.vencentdev.freelance.repository.VerificationTokenRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenService {
    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    public VerificationTokenService(VerificationTokenRepository tokenRepository, UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    public String createTokenForUser(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken vt = new VerificationToken(token, user, Instant.now().plus(1, ChronoUnit.DAYS));
        tokenRepository.save(vt);
        return token;
    }

    public Optional<VerificationToken> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public Map<String, Object> verifyToken(String token) {
        var opt = tokenRepository.findByToken(token);
        if (opt.isEmpty()) return Map.of("error", "Invalid token");

        VerificationToken vt = opt.get();
        if (Instant.now().isAfter(vt.getExpiry())) {
            tokenRepository.delete(vt);
            return Map.of("error", "Token expired");
        }

        User user = vt.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
        tokenRepository.delete(vt);
        return Map.of("message", "Email verified");
    }
}
