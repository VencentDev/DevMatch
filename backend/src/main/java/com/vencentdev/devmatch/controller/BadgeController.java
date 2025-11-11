// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.model.Badge;
import com.vencentdev.devmatch.service.BadgeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {
    private final BadgeService badgeService;

    public BadgeController(BadgeService badgeService) { this.badgeService = badgeService; }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> listForUser(@PathVariable Long userId) {
        List<Badge> badges = badgeService.listBadgesForUser(userId);
        return ResponseEntity.ok(badges);
    }

    @PostMapping("/evaluate/user/{userId}")
    public ResponseEntity<?> evaluateUserBadges(@PathVariable Long userId) {
        try {
            badgeService.evaluateBadgesForUser(userId);
            return ResponseEntity.ok(Map.of("message", "Badge evaluation completed"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }
}
