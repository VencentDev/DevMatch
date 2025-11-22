package com.vencentdev.devmatch.util;

import com.vencentdev.devmatch.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey;
    private final long expirationMillis;

    public JwtUtil(
            @Value("${app.jwt.secret:}") String secret,
            @Value("${app.jwt.expiration-ms:86400000}") long expirationMillis
    ) {
        this.expirationMillis = expirationMillis;

        if (secret == null || secret.isBlank()) {
            this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        } else {
            byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
            if (keyBytes.length < 32) {
                try {
                    MessageDigest md = MessageDigest.getInstance("SHA-256");
                    keyBytes = md.digest(keyBytes);
                } catch (NoSuchAlgorithmException e) {
                    throw new IllegalStateException("Unable to initialize JWT key", e);
                }
            }
            this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        }
    }

    // -----------------------------------------
    // New generateToken(User user)
    // -----------------------------------------
    public String generateToken(User user) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(user.getUsername())
                // Custom claims here 👇
                .claim("profileCompleted", user.isProfileCompleted())
                .claim("role", user.getRole() != null ? user.getRole().getName() : null)
                .claim("userType", user.getUserType() != null ? user.getUserType().name() : null)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return getAllClaims(token).getSubject();
    }

    public Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception ignored) {
            return false;
        }
    }
}
