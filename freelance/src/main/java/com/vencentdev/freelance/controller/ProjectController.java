// java
package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.controller.dto.ProjectRequest;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) { this.projectService = projectService; }

    @PostMapping
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        boolean isClient = authentication.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .collect(Collectors.toSet())
                .contains("ROLE_CLIENT");
        if (!isClient) {
            return ResponseEntity.status(403).body(Map.of("error", "Only clients can post projects"));
        }
        String username = authentication.getName();
        try {
            Project created = projectService.createProject(username, req);
            return ResponseEntity.ok(Map.of("message", "Project created", "project", created));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> listProjects() {
        return ResponseEntity.ok(projectService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(projectService.getById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}
