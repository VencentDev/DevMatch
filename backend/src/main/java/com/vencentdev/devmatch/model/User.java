package com.vencentdev.devmatch.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private UserType userType = UserType.UNKNOWN;

    private String fullName;
    private String country;
    private String address;
    private String phone;
    private String governmentIdUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private KycStatus kycStatus = KycStatus.PENDING;

    private String title;

    @ElementCollection(fetch = FetchType.LAZY)
    private Set<String> skills = new HashSet<>();

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> links = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    private Set<String> languages = new HashSet<>();

    @ElementCollection(fetch = FetchType.LAZY)
    private Set<String> education = new HashSet<>();

    @ElementCollection(fetch = FetchType.LAZY)
    private Set<String> certifications = new HashSet<>();

    private String industry;
    private String paymentMethod;
    private boolean emailVerified = false;
    private boolean profileCompleted = false;

    // --------------- IMPORTANT FIXES ----------------------

    /**
     * REAL Spring Security username.
     * MUST BE the actual username stored in DB.
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Convenience for login (username OR email).
     */
    public String getLoginIdentifier() {
        return email != null ? email : username;
    }

    // --------------- UserDetails overrides -----------------

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null || role.getName() == null) return Collections.emptyList();

        String roleName = role.getName().startsWith("ROLE_")
                ? role.getName()
                : "ROLE_" + role.getName();

        return List.of(new SimpleGrantedAuthority(roleName));
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() {
        // You check emailVerified manually in your logic
        return true;
    }

    // --------------- equals / hashcode ---------------------

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User other)) return false;
        return Objects.equals(id, other.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }

    // --------------- Enums ----------------------

    public enum UserType {
        UNKNOWN,
        FREELANCER,
        CLIENT
    }

    public enum KycStatus {
        PENDING,
        VERIFIED,
        REJECTED
    }
}
