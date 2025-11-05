package com.vencentdev.freelance.service;

import com.vencentdev.freelance.controller.dto.ProjectRequest;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.ProjectRepository;
import com.vencentdev.freelance.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(String username, ProjectRequest req) {
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + username));

        if (!Boolean.TRUE.equals(owner.isProfileCompleted())) {
            throw new IllegalStateException("Complete your profile before posting projects");
        }

        Project p = new Project();
        p.setTitle(req.getTitle());
        p.setDescription(req.getDescription());
        p.setBudget(req.getBudget());
        if (req.getSkillsNeeded() != null) p.setSkillsNeeded(req.getSkillsNeeded());
        p.setDeadline(req.getDeadline());
        p.setOwner(owner);

        return projectRepository.save(p);
    }

    public List<Project> listAll() {
        return projectRepository.findAll();
    }

    public Project getById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Project not found: " + id));
    }

    public Project updateProject(String username, Long id, ProjectRequest req) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Project not found: " + id));

        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + username));

        // Debug logs
        System.out.println("DEBUG: Authenticated user ID: " + currentUser.getId());
        System.out.println("DEBUG: Project owner ID: " + existing.getOwner().getId());

        // Ownership check
        if (!existing.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("Only the project owner can edit this project");
        }

        existing.setTitle(req.getTitle());
        existing.setDescription(req.getDescription());
        existing.setBudget(req.getBudget());
        if (req.getSkillsNeeded() != null) {
            existing.setSkillsNeeded(req.getSkillsNeeded());
        }
        existing.setDeadline(req.getDeadline());

        return projectRepository.save(existing);
    }


    public void deleteProject(String username, Long id) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Project not found: " + id));

        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + username));

        // Ownership check using user ID
        if (!existing.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("Only the project owner can delete this project");
        }

        projectRepository.delete(existing);
    }
}
