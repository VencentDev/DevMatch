package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.controller.dto.ProjectRequest;
import com.vencentdev.freelance.controller.dto.ProjectResponse;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.service.ProjectService;
import jakarta.validation.Valid;
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
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse.UserSummary ownerSummary = new ProjectResponse.UserSummary(
                project.getOwner().getId(),
                project.getOwner().getUsername(),
                project.getOwner().getEmail()
        );

        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setBudget(project.getBudget());
        response.setSkillsNeeded(project.getSkillsNeeded());
        response.setDeadline(project.getDeadline());
        response.setOwner(ownerSummary);

        return response;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectRequest req,
                                           Authentication authentication) {
        String username = authentication.getName();
        try {
            Project created = projectService.createProject(username, req);
            return ResponseEntity.status(201).body(Map.of(
                    "message", "Project created",
                    "project", mapToResponse(created)
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Unexpected error: " + e.getMessage()));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editProject(@PathVariable Long id,
                                         @Valid @RequestBody ProjectRequest req,
                                         Authentication authentication) {
        String username = authentication.getName();
        try {
            Project updated = projectService.updateProject(username, id, req);
            return ResponseEntity.ok(Map.of(
                    "message", "Project updated",
                    "project", mapToResponse(updated)
            ));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Unexpected error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id,
                                           Authentication authentication) {
        String username = authentication.getName();
        try {
            projectService.deleteProject(username, id);
            return ResponseEntity.ok(Map.of("message", "Project deleted"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Unexpected error: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> listProjects() {
        List<Project> projects = projectService.listAll();
        List<ProjectResponse> responseList = projects.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable Long id) {
        try {
            Project project = projectService.getById(id);
            return ResponseEntity.ok(mapToResponse(project));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}
