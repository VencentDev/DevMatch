// java
package com.vencentdev.freelance.service;

import com.vencentdev.freelance.controller.dto.ProjectRequest;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.ProjectRepository;
import com.vencentdev.freelance.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(String username, ProjectRequest req) {
        User owner = findUserByUsername(username);

        if (!Boolean.TRUE.equals(owner.isProfileCompleted())) {
            throw new IllegalStateException("Complete your profile before posting projects");
        }

        Project project = new Project();
        project.setTitle(req.getTitle());
        project.setDescription(req.getDescription());
        project.setBudget(req.getBudget());
        project.setSkillsNeeded(req.getSkillsNeeded());
        project.setDeadline(req.getDeadline());
        project.setOwner(owner);
        project.setStatus(Project.Status.OPEN);

        return projectRepository.save(project);
    }

    public List<Project> listAll() {
        return projectRepository.findAll();
    }

    public Project getById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Project ID cannot be null");
        }
        return findProjectById(id);
    }

    public Project updateProject(String username, Long id, ProjectRequest req) {
        Project existingProject = findProjectById(id);
        User currentUser = findUserByUsername(username);

        validateOwnership(existingProject, currentUser);

        existingProject.setTitle(req.getTitle());
        existingProject.setDescription(req.getDescription());
        existingProject.setBudget(req.getBudget());
        existingProject.setSkillsNeeded(req.getSkillsNeeded());
        existingProject.setDeadline(req.getDeadline());

        return projectRepository.save(existingProject);
    }

    public void deleteProject(String username, Long id) {
        Project existingProject = findProjectById(id);
        User currentUser = findUserByUsername(username);

        validateOwnership(existingProject, currentUser);

        projectRepository.delete(existingProject);
    }

    /**
     * Browse projects with filters. If viewerUsername belongs to a freelancer
     * then hide projects that already have a hired freelancer.
     */
    public List<Project> browseProjects(String viewerUsername, List<String> skills, Double minBudget, Double maxBudget, String deadlineBefore) {
        boolean hideHired;
        if (viewerUsername != null) {
            User viewer = userRepository.findByUsername(viewerUsername).orElse(null);
            if (viewer != null) {
                hideHired = viewer.getAuthorities().stream()
                        .anyMatch(a -> "ROLE_FREELANCER".equals(a.getAuthority()));
            } else {
                hideHired = false;
            }
        } else {
            hideHired = false;
        }

        return projectRepository.findAll().stream()
                .filter(project -> !hideHired || project.getHiredFreelancer() == null)
                .filter(project -> matchesSkills(project, skills))
                .filter(project -> matchesBudget(project, minBudget, maxBudget))
                .filter(project -> matchesDeadline(project, deadlineBefore))
                .collect(Collectors.toList());
    }

    // allow external save (used when hiring)
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + username));
    }

    private Project findProjectById(Long id) {
        logger.info("Searching for project with ID: {}", id);
        return projectRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Project not found with ID: {}", id);
                    return new NoSuchElementException("Project not found: " + id);
                });
    }

    private void validateOwnership(Project project, User user) {
        if (!project.getOwner().getId().equals(user.getId())) {
            throw new IllegalStateException("Only the project owner can perform this action");
        }
    }

    private boolean matchesSkills(Project project, List<String> skills) {
        return skills == null || skills.isEmpty() ||
                project.getSkillsNeeded().stream()
                        .map(String::toLowerCase)
                        .anyMatch(skill -> skills.stream()
                                .map(String::toLowerCase)
                                .anyMatch(skill::equals));
    }

    private boolean matchesBudget(Project project, Double minBudget, Double maxBudget) {
        return (minBudget == null || project.getBudget() >= minBudget) &&
                (maxBudget == null || project.getBudget() <= maxBudget);
    }

    private boolean matchesDeadline(Project project, String deadlineBefore) {
        return deadlineBefore == null || project.getDeadline().isBefore(java.time.LocalDate.parse(deadlineBefore));
    }
}
