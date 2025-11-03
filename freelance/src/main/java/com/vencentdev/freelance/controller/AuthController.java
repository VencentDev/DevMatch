// java
package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    static record LoginRequest(String identifier, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletRequest request) {
        String ident = req.identifier();
        String usernameToAuth = ident;

        // Resolve identifier: prefer direct username match, then email match
        var byUsername = userRepository.findByUsername(ident);
        if (byUsername.isPresent()) {
            usernameToAuth = byUsername.get().getUsername();
        } else {
            var byEmail = userRepository.findByEmail(ident);
            if (byEmail.isPresent()) {
                usernameToAuth = byEmail.get().getUsername();
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "No user found for given identifier"));
            }
        }

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(usernameToAuth, req.password());

        try {
            Authentication auth = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);

            var roles = auth.getAuthorities().stream()
                    .map(a -> a.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(Map.of(
                    "username", usernameToAuth,
                    "roles", roles,
                    "message", "Login successful"
            ));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.logout();
        } catch (Exception ignored) {}
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }
}
