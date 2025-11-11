package com.vencentdev.devmatch.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "verification_tokens")
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Instant expiry;

    public VerificationToken() {}

    public VerificationToken(String token, User user, Instant expiry) {
        this.token = token;
        this.user = user;
        this.expiry = expiry;
    }

    public Long getId() { return id; }
    public String getToken() { return token; }
    public User getUser() { return user; }
    public Instant getExpiry() { return expiry; }
}
