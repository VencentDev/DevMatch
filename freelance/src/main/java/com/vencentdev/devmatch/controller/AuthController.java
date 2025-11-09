// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.SignupRequest;
import com.vencentdev.devmatch.controller.dto.FinishProfileRequest;
import com.vencentdev.devmatch.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) { this.authService = authService; }

    static record LoginRequest(String identifier, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Map<String, Object> resp = authService.login(req.identifier(), req.password());
            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest req) {
        return ResponseEntity.ok(authService.signup(req));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmailPost(@RequestBody Map<String, String> body) {
        String token = body == null ? null : body.get("token");
        if (token == null || token.isBlank()) return ResponseEntity.badRequest().body(Map.of("error", "Token missing"));
        return ResponseEntity.ok(authService.verifyToken(token));
    }

    @PostMapping("/finish-profile")
    public ResponseEntity<?> finishProfile(@RequestBody FinishProfileRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        return ResponseEntity.ok(authService.finishProfile(username, req));
    }
}
