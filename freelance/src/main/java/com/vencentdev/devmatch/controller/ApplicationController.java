// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.ApplicationRequest;
import com.vencentdev.devmatch.controller.dto.ApplicationResponse;
import com.vencentdev.devmatch.model.Application;
import com.vencentdev.devmatch.service.ApplicationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ApplicationController {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/{projectId}/apply")
    @PreAuthorize("hasAuthority('ROLE_FREELANCER')")
    public ResponseEntity<?> apply(@PathVariable Long projectId,
                                   @Valid @RequestBody ApplicationRequest req,
                                   Authentication authentication) {
        String username = authentication.getName();
        try {
            Application app = applicationService.applyToProject(username, projectId, req);
            return ResponseEntity.status(201).body(Map.of("message", "Application submitted", "applicationId", app.getId()));
        } catch (IllegalStateException | NoSuchElementException e) {
            logger.warn("Apply failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Apply error", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @GetMapping("/{projectId}/applications")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> listApplications(@PathVariable Long projectId, Authentication authentication) {
        String username = authentication.getName();
        try {
            List<Application> apps = applicationService.getApplicationsForProject(username, projectId);
            List<ApplicationResponse> resp = apps.stream().map(this::map).collect(Collectors.toList());
            return ResponseEntity.ok(resp);
        } catch (IllegalStateException | NoSuchElementException e) {
            logger.warn("List applicants failed: {}", e.getMessage());
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("List applicants error", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    // New: hire endpoint
    @PostMapping("/{projectId}/applications/{applicationId}/hire")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> hire(@PathVariable Long projectId,
                                  @PathVariable Long applicationId,
                                  Authentication authentication) {
        String username = authentication.getName();
        try {
            applicationService.hireFreelancer(username, projectId, applicationId);
            return ResponseEntity.ok(Map.of("message", "Freelancer hired"));
        } catch (IllegalStateException | NoSuchElementException e) {
            logger.warn("Hire failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Hire error", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    private ApplicationResponse map(Application a) {
        ApplicationResponse r = new ApplicationResponse();
        r.setId(a.getId());
        r.setFreelancerId(a.getFreelancer().getId());
        r.setFreelancerUsername(a.getFreelancer().getUsername());
        r.setProposalText(a.getProposalText());
        r.setProposedBudget(a.getProposedBudget());
        r.setStatus(a.getStatus().name());
        r.setCreatedAt(a.getCreatedAt());
        r.setUpdatedAt(a.getUpdatedAt());
        return r;
    }
}
