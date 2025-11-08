package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.model.Escrow;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.EscrowRepository;
import com.vencentdev.freelance.repository.UserRepository;
import com.vencentdev.freelance.service.EscrowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/escrows")
public class EscrowController {
    private static final Logger logger = LoggerFactory.getLogger(EscrowController.class);
    private final EscrowRepository escrowRepo;
    private final EscrowService escrowService;
    private final UserRepository userRepo;

    public EscrowController(EscrowRepository escrowRepo, EscrowService escrowService, UserRepository userRepo) {
        this.escrowRepo = escrowRepo;
        this.escrowService = escrowService;
        this.userRepo = userRepo;
    }

    @GetMapping
    public ResponseEntity<?> getByProject(@RequestParam(required = false) Long projectId) {
        try {
            if (projectId != null) {
                Escrow e = escrowRepo.findByProjectId(projectId).orElse(null);
                if (e == null) return ResponseEntity.status(404).body(Map.of("error", "Escrow not found"));
                return ResponseEntity.ok(mapEscrow(e));
            } else {
                List<Map<String, Object>> all = escrowRepo.findAll().stream().map(this::mapEscrow).collect(Collectors.toList());
                return ResponseEntity.ok(all);
            }
        } catch (Exception e) {
            logger.error("Fetch escrows failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            Escrow e = escrowRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Escrow not found"));
            return ResponseEntity.ok(mapEscrow(e));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Fetch escrow failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }

    @PostMapping("/{id}/release")
    public ResponseEntity<?> release(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            Escrow e = escrowRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Escrow not found"));
            String requester = authentication.getName();
            User user = userRepo.findByUsername(requester).orElseThrow(() -> new NoSuchElementException("User not found"));

            boolean isClient = e.getClient().getId().equals(user.getId());
            boolean isAdmin = user.getAuthorities().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
            if (!isClient && !isAdmin) {
                return ResponseEntity.status(403).body(Map.of("error", "Only escrow client or admin can release"));
            }

            escrowService.releaseEscrow(id);
            return ResponseEntity.ok(Map.of("message", "Escrow released"));
        } catch (NoSuchElementException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Release failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<?> refund(@PathVariable Long id, Authentication authentication, @RequestBody(required = false) Map<String, String> body) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            String requester = authentication.getName();
            User user = userRepo.findByUsername(requester).orElseThrow(() -> new NoSuchElementException("User not found"));
            boolean isAdmin = user.getAuthorities().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
            if (!isAdmin) {
                return ResponseEntity.status(403).body(Map.of("error", "Only admin can refund escrows"));
            }

            escrowService.refundEscrow(id);
            return ResponseEntity.ok(Map.of("message", "Escrow refunded"));
        } catch (NoSuchElementException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Refund failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }

    // replace the existing mapEscrow method with this implementation
    private Map<String, Object> mapEscrow(Escrow e) {
        Map<String, Object> m = new java.util.HashMap<>();
        m.put("id", e.getId());
        m.put("amount", e.getAmount());
        m.put("status", e.getStatus() == null ? null : e.getStatus().name());
        m.put("projectId", e.getProject() == null ? null : e.getProject().getId());
        m.put("clientId", e.getClient() == null ? null : e.getClient().getId());
        m.put("freelancerId", e.getFreelancer() == null ? null : e.getFreelancer().getId());
        m.put("createdAt", e.getCreatedAt());
        m.put("completedAt", e.getCompletedAt());
        return m;
    }

}
