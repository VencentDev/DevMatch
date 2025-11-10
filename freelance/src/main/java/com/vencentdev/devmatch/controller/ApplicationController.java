// java
package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.ApplicationRequest;
import com.vencentdev.devmatch.controller.dto.ApplicationResponse;
import com.vencentdev.devmatch.controller.dto.CandidateResponse;
import com.vencentdev.devmatch.controller.dto.CandidateScore;
import com.vencentdev.devmatch.model.Application;
import com.vencentdev.devmatch.model.Project;
import com.vencentdev.devmatch.service.ApplicationService;
import com.vencentdev.devmatch.service.ProjectService;
import com.vencentdev.devmatch.service.RecommendationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ApplicationController {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);
    private final ApplicationService applicationService;
    private final RecommendationService recommendationService;
    private final ProjectService projectService;

    public ApplicationController(ApplicationService applicationService, RecommendationService recommendationService, ProjectService projectService) {
        this.applicationService = applicationService;
        this.projectService = projectService;
        this.recommendationService = recommendationService;
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
    public ResponseEntity<?> listApplications(@PathVariable Long projectId,
                                              @RequestParam(required = false) Double minScore,
                                              @RequestParam(required = false) Integer recentDays,
                                              @RequestParam(required = false, defaultValue = "score") String sortBy,
                                              @RequestParam(required = false) Integer topN,
                                              Authentication authentication) {
        String username = authentication.getName();
        try {
            List<Application> apps = applicationService.getApplicationsForProject(username, projectId);
            Project project = projectService.getById(projectId);

            LocalDateTime cutoff = null;
            if (recentDays != null && recentDays > 0) {
                cutoff = LocalDateTime.now().minusDays(recentDays);
            }

            List<CandidateResponse> candidates = new ArrayList<>();
            for (Application a : apps) {
                if (cutoff != null && (a.getCreatedAt() == null || a.getCreatedAt().isBefore(cutoff))) {
                    continue;
                }

                double score = 0.0;
                try {
                    var cs = recommendationService.scoreCandidate(a.getFreelancer(), project, a.getProposedBudget());
                    score = cs == null ? 0.0 : cs.getScore();
                } catch (Exception e) {
                    logger.warn("Failed to score candidate {}: {}", a.getFreelancer() == null ? "null" : a.getFreelancer().getId(), e.getMessage());
                }

                if (minScore != null && score < minScore) continue;

                CandidateResponse cr = new CandidateResponse();
                cr.setId(a.getId());
                cr.setFreelancerId(a.getFreelancer() == null ? null : a.getFreelancer().getId());
                cr.setFreelancerUsername(a.getFreelancer() == null ? null : a.getFreelancer().getUsername());
                cr.setProposalText(a.getProposalText());
                cr.setProposedBudget(a.getProposedBudget());
                cr.setStatus(a.getStatus() == null ? null : a.getStatus().name());
                cr.setCreatedAt(a.getCreatedAt());
                cr.setUpdatedAt(a.getUpdatedAt());
                cr.setCandidateScore(score);

                candidates.add(cr);
            }

            Comparator<CandidateResponse> comparator;
            if ("recent".equalsIgnoreCase(sortBy)) {
                comparator = Comparator.comparing(CandidateResponse::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder())).reversed();
            } else {
                comparator = Comparator.comparing(CandidateResponse::getCandidateScore, Comparator.nullsLast(Comparator.naturalOrder())).reversed();
            }

            List<CandidateResponse> sorted = candidates.stream().sorted(comparator).collect(Collectors.toList());

            if (topN != null && topN > 0 && sorted.size() > topN) {
                sorted = sorted.subList(0, topN);
            }

            return ResponseEntity.ok(sorted);
        } catch (IllegalStateException | NoSuchElementException e) {
            logger.warn("List applicants failed: {}", e.getMessage());
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("List applicants error", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }


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
