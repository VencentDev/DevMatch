package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.controller.dto.ProjectRequest;
import com.vencentdev.freelance.controller.dto.ProjectResponse;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.service.ProjectService;
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
public class ProjectController {
    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);
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

    private ResponseEntity<?> handleException(Exception e, int statusCode) {
        logger.error("Error: {}", e.getMessage(), e);
        return ResponseEntity.status(statusCode).body(Map.of("error", e.getMessage()));
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
        } catch (IllegalStateException | NoSuchElementException e) {
            return handleException(e, 400);
        } catch (Exception e) {
            return handleException(e, 500);
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
            return handleException(e, 404);
        } catch (IllegalStateException e) {
            return handleException(e, 403);
        } catch (Exception e) {
            return handleException(e, 500);
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
            return handleException(e, 404);
        } catch (IllegalStateException e) {
            return handleException(e, 403);
        } catch (Exception e) {
            return handleException(e, 500);
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
            return handleException(e, 404);
        }
    }

    @GetMapping("/browse")
    public ResponseEntity<?> browseProjects(
            @RequestParam(required = false) List<String> skills,
            @RequestParam(required = false) Double minBudget,
            @RequestParam(required = false) Double maxBudget,
            @RequestParam(required = false) String deadlineBefore) {
        try {
            List<Project> projects = projectService.browseProjects(skills, minBudget, maxBudget, deadlineBefore);
            List<ProjectResponse> responseList = projects.stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(responseList);
        } catch (Exception e) {
            return handleException(e, 500);
        }
    }
}
