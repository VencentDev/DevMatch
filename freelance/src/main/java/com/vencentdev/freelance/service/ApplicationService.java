package com.vencentdev.freelance.service;

import com.vencentdev.freelance.controller.dto.ApplicationRequest;
import com.vencentdev.freelance.model.Application;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.ApplicationRepository;
import com.vencentdev.freelance.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ApplicationService {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationService.class);
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    public ApplicationService(ApplicationRepository applicationRepository,
                              UserRepository userRepository,
                              ProjectService projectService) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
    }

    public Application applyToProject(String freelancerUsername, Long projectId, ApplicationRequest req) {
        User freelancer = userRepository.findByUsername(freelancerUsername)
                .orElseThrow(() -> new NoSuchElementException("Freelancer not found: " + freelancerUsername));

        Project project = projectService.getById(projectId);
        boolean isFreelancer = freelancer.getAuthorities().stream()
                .anyMatch(a -> "ROLE_FREELANCER".equals(a.getAuthority()));
        if (!isFreelancer) {
            throw new IllegalStateException("Only users with ROLE_FREELANCER can apply to projects");
        }
        if (project.getOwner().getId().equals(freelancer.getId())) {
            throw new IllegalStateException("Cannot apply to your own project");
        }

        applicationRepository.findByFreelancerIdAndProjectId(freelancer.getId(), projectId)
                .ifPresent(a -> {
                    throw new IllegalStateException("Already applied to this project");
                });

        Application app = new Application();
        app.setFreelancer(freelancer);
        app.setProject(project);
        app.setProposalText(req.getProposalText());
        app.setProposedBudget(req.getProposedBudget());
        app.setStatus(Application.Status.PENDING);
        logger.info("User {} applying to project {}", freelancerUsername, projectId);
        return applicationRepository.save(app);
    }

    public List<Application> getApplicationsForProject(String clientUsername, Long projectId) {
        Project project = projectService.getById(projectId);

        if (!project.getOwner().getUsername().equals(clientUsername)) {
            throw new IllegalStateException("Only project owner can view applicants");
        }

        return applicationRepository.findByProjectId(projectId);
    }
}
