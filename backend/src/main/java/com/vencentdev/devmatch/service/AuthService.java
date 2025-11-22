// java
package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.controller.dto.SignupRequest;
import com.vencentdev.devmatch.controller.dto.FinishProfileRequest;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.model.Role;
import com.vencentdev.devmatch.repository.RoleRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import com.vencentdev.devmatch.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final VerificationTokenService tokenService;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository,
                       VerificationTokenService tokenService,
                       JwtUtil jwtUtil, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    public Map<String, Object> login(String identifier, String password) throws AuthenticationException {
        // Find user by username or email
        User user = userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new IllegalArgumentException("No username or email found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Password incorrect");
        }
        // Authenticate the user
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), password)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);

            List<String> roles = auth.getAuthorities().stream()
                    .map(a -> a.getAuthority())
                    .collect(Collectors.toList());

            String token = jwtUtil.generateToken(user.getUsername());

            return Map.of(
                    "username", user.getUsername(),
                    "roles", roles,
                    "token", token,
                    "accessToken", token,
                    "message", "Login successful",
                    "profileCompleted", user.isProfileCompleted(),
                    "emailVerified", user.isEmailVerified()
            );
        } catch (AuthenticationException e) {
            throw new AuthenticationException("Invalid username/email or password") {};
        }
    }

    public Map<String, Object> signup(SignupRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already taken");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmailVerified(false);
        user.setProfileCompleted(false);
        userRepository.save(user);

        String token = tokenService.createTokenForUser(user);
        emailService.sendVerificationEmail(user.getEmail(), token);
        return Map.of("message", "Signup successful, verify email", "token", token);
    }

    public Map<String, Object> finishProfile(String username, FinishProfileRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // single role assignment
        if (req.getRole() != null && !req.getRole().isBlank()) {
            roleRepository.findByName(req.getRole()).ifPresent(user::setRole);
        }

        // parse and set userType if provided
        if (req.getUserType() != null && !req.getUserType().isBlank()) {
            try {
                user.setUserType(User.UserType.valueOf(req.getUserType().toUpperCase()));
            } catch (IllegalArgumentException ignored) {
                // invalid userType string - ignore or log as needed
            }
        }

        // common fields
        if (req.getFullName() != null) user.setFullName(req.getFullName());
        if (req.getCountry() != null) user.setCountry(req.getCountry());
        if (req.getAddress() != null) user.setAddress(req.getAddress());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getGovernmentIdUrl() != null) user.setGovernmentIdUrl(req.getGovernmentIdUrl());

        // freelancer-specific
        if (req.getTitle() != null) user.setTitle(req.getTitle());
        if (req.getSkills() != null) user.setSkills(new HashSet<>(req.getSkills()));
        if (req.getLinks() != null) user.setLinks(req.getLinks());
        if (req.getLanguages() != null) user.setLanguages(new HashSet<>(req.getLanguages()));
        if (req.getEducation() != null) user.setEducation(new HashSet<>(req.getEducation()));
        if (req.getCertifications() != null) user.setCertifications(new HashSet<>(req.getCertifications()));

        // client-specific
        if (req.getIndustry() != null) user.setIndustry(req.getIndustry());
        if (req.getPaymentMethod() != null) user.setPaymentMethod(req.getPaymentMethod());

        user.setProfileCompleted(true);
        userRepository.save(user);

        return Map.of("message", "Profile updated successfully");
    }

    public Map<String, Object> verifyToken(String token) {
        return tokenService.verifyToken(token);
    }
}