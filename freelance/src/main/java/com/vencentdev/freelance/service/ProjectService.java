// java
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

        // Require finished profile before allowing project creation.
        // Assumes User has a boolean getter named isProfileCompleted()
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
        return projectRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Project not found: " + id));
    }
}
