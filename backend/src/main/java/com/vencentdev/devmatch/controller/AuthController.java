// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.SignupRequest;
import com.vencentdev.devmatch.controller.dto.FinishProfileRequest;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.model.VerificationToken;
import com.vencentdev.devmatch.service.EmailService;
import com.vencentdev.devmatch.service.AuthService;
import com.vencentdev.devmatch.service.VerificationTokenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;

    public AuthController(AuthService authService, VerificationTokenService verificationTokenService, EmailService emailService) {
        this.authService = authService;
        this.verificationTokenService = verificationTokenService;
        this.emailService = emailService;}

    static record LoginRequest(String identifier, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Map<String, Object> resp = authService.login(req.identifier(), req.password());
            String token = (String) resp.get("token");
            if (token == null) token = (String) resp.get("accessToken");
            if (token == null) token = (String) resp.get("jwt");

            if (token == null) {
                // Auth succeeded but no token generated — return explicit error
                return ResponseEntity.status(500).body(Map.of("error", "Authentication succeeded but no token was generated"));
            }

            // create HttpOnly cookie (set secure(true) in production with HTTPS)
            ResponseCookie cookie = ResponseCookie.from("ACCESS_TOKEN", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60) // 7 days
                    .sameSite("Lax")
                    .build();

            // copy response body and ensure token is present for SPA clients
            Map<String, Object> body = new HashMap<>(resp);
            body.put("token", token);
            body.put("accessToken", token); // keep both keys for compatibility

            ResponseEntity.BodyBuilder builder = ResponseEntity.ok();
            builder.header(HttpHeaders.SET_COOKIE, cookie.toString());
            builder.header(HttpHeaders.AUTHORIZATION, "Bearer " + token);

            return builder.body(body);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(req));
    }


    @PostMapping("/verify/{token}")
    public ResponseEntity<?> verifyEmailPost(@PathVariable String token) {
        if (token == null || token.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token missing"));
        }
        return ResponseEntity.ok(authService.verifyToken(token));
    }

    @PostMapping("/resend/{token}")
    public ResponseEntity<?> resendVerificationEmail(@PathVariable String token) {
        var opt = verificationTokenService.findByToken(token);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid token"));
        }

        VerificationToken vt = opt.get();
        User user = vt.getUser();

        if (user.isEmailVerified()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already verified"));
        }

        // Generate a new token and send the email
        String newToken = verificationTokenService.createTokenForUser(user);
        emailService.sendVerificationEmail(user.getEmail(), newToken);

        return ResponseEntity.ok(Map.of("message", "Verification email resent"));
    }
}