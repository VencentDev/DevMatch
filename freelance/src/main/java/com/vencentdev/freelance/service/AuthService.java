// java
package com.vencentdev.freelance.service;

import com.vencentdev.freelance.controller.dto.SignupRequest;
import com.vencentdev.freelance.controller.dto.FinishProfileRequest;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.model.Role;
import com.vencentdev.freelance.repository.RoleRepository;
import com.vencentdev.freelance.repository.UserRepository;
import com.vencentdev.freelance.util.JwtUtil;
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

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository,
                       VerificationTokenService tokenService,
                       JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, Object> login(String identifier, String password) throws AuthenticationException {

        String username = userRepository.findByUsername(identifier)
                .map(User::getUsername)
                .or(() -> userRepository.findByEmail(identifier).map(User::getUsername))
                .orElseThrow(() -> new IllegalArgumentException("No user found for given identifier"));

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        List<String> roles = auth.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .collect(Collectors.toList());

        String token = jwtUtil.generateToken(username);

        return Map.of(
                "username", username,
                "roles", roles,
                "token", token,
                "accessToken", token,
                "message", "Login successful"
        );
    }

    public Map<String, Object> signup(SignupRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            return Map.of("error", "Username already taken");
        }
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return Map.of("error", "Email already registered");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmailVerified(false);
        user.setProfileCompleted(false);
        userRepository.save(user);

        String token = tokenService.createTokenForUser(user);

        return Map.of("message", "Signup successful, verify email", "token", token);
    }

    public Map<String, Object> finishProfile(String username, FinishProfileRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        if (req.getRoles() != null && !req.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>();
            for (String roleName : req.getRoles()) {
                roleRepository.findByName(roleName).ifPresent(roles::add);
            }
            if (!roles.isEmpty()) user.setRoles(roles);
        }
        user.setProfileCompleted(true);
        userRepository.save(user);
        return Map.of("message", "Profile updated successfully");
    }

    public Map<String, Object> verifyToken(String token) {
        return tokenService.verifyToken(token);
    }
}
