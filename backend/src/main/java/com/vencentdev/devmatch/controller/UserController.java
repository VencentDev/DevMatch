// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.FinishProfileRequest;
import com.vencentdev.devmatch.controller.dto.ProfileResponse;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.UserRepository;
import com.vencentdev.devmatch.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public UserController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        String username = authentication.getName();

        Optional<User> maybeUser = userRepository.findByUsername(username);
        if (maybeUser.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        User user = maybeUser.get();

        // copy lazy collections while session is active
        Set<String> skills = user.getSkills() != null ? new HashSet<>(user.getSkills()) : Collections.emptySet();
        List<String> links = user.getLinks() != null ? new ArrayList<>(user.getLinks()) : Collections.emptyList();
        Set<String> languages = user.getLanguages() != null ? new HashSet<>(user.getLanguages()) : Collections.emptySet();
        Set<String> education = user.getEducation() != null ? new HashSet<>(user.getEducation()) : Collections.emptySet();
        Set<String> certifications = user.getCertifications() != null ? new HashSet<>(user.getCertifications()) : Collections.emptySet();

        // User has a single role field (set via AuthService.finishProfile), not a collection
        String role = null;
        if (user.getRole() != null) {
            role = user.getRole().getName();
        }

        ProfileResponse resp = new ProfileResponse();
        resp.setId(user.getId());
        resp.setUsername(user.getUsername());
        resp.setEmail(user.getEmail());
        resp.setFullName(user.getFullName());
        resp.setCountry(user.getCountry());
        resp.setAddress(user.getAddress());
        resp.setPhone(user.getPhone());
        resp.setGovernmentIdUrl(user.getGovernmentIdUrl());
        resp.setTitle(user.getTitle());
        resp.setSkills(skills);
        resp.setLinks(links);
        resp.setLanguages(languages);
        resp.setEducation(education);
        resp.setCertifications(certifications);
        resp.setIndustry(user.getIndustry());
        resp.setPaymentMethod(user.getPaymentMethod());
        resp.setEmailVerified(user.isEmailVerified());
        resp.setProfileCompleted(user.isProfileCompleted());
        resp.setUserType(user.getUserType() != null ? user.getUserType().name().toLowerCase() : null);
        resp.setKycStatus(user.getKycStatus() != null ? user.getKycStatus().name() : null);
        resp.setRole(role);

        return ResponseEntity.ok(resp);
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
