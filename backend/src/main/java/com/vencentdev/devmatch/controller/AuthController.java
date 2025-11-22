// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.LoginResponse;
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
            LoginResponse resp = authService.login(req.identifier(), req.password());
            String token = resp.getToken();

            // HttpOnly cookie
            ResponseCookie cookie = ResponseCookie.from("ACCESS_TOKEN", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .body(resp);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
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