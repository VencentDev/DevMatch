// java
package com.vencentdev.devmatch.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "badges",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "type"}))
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum Type { RISING_STAR, FAST_FINISHER, TOP_RATED }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(nullable = false)
    private String description;

    private LocalDateTime awardedAt = LocalDateTime.now();

    public Badge() {}

    public Badge(User user, Type type, String description) {
        this.user = user;
        this.type = type;
        this.description = description;
        this.awardedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }

    @JsonIgnore
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getAwardedAt() { return awardedAt; }
    public void setAwardedAt(LocalDateTime awardedAt) { this.awardedAt = awardedAt; }
}
