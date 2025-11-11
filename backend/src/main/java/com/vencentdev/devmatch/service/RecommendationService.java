// java
package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.controller.dto.CandidateScore;
import com.vencentdev.devmatch.model.Application;
import com.vencentdev.devmatch.model.Project;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.ApplicationRepository;
import com.vencentdev.devmatch.repository.ProjectRepository;
import com.vencentdev.devmatch.repository.ReviewRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    private static final Logger logger = LoggerFactory.getLogger(RecommendationService.class);

    private static final double W_SEMANTIC_SKILL = 0.60;
    private static final double W_BUDGET = 0.15;
    private static final double W_PAST = 0.20;

    private final ReviewRepository reviewRepo;
    private final ProjectRepository projectRepo;
    private final ApplicationRepository applicationRepo;
    private final RestTemplate restTemplate;

    @Value("${app.semantic.ai.url:http://localhost:5000/semantic-skill-match}")
    private String semanticUrl;

    public RecommendationService(ReviewRepository reviewRepo,
                                 ProjectRepository projectRepo,
                                 ApplicationRepository applicationRepo
                                 ) {
        this.reviewRepo = reviewRepo;
        this.projectRepo = projectRepo;
        this.applicationRepo = applicationRepo;

        this.restTemplate = new RestTemplate();
    }

    public List<CandidateScore> recommendForProject(Long projectId, int topN) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found: " + projectId));


        List<Application> apps = applicationRepo.findByProjectId(projectId);
        List<User> candidates = apps.stream().map(Application::getFreelancer).distinct().collect(Collectors.toList());

        List<CandidateScore> scored = new ArrayList<>();
        for (User freelancer : candidates) {
            Application app = apps.stream()
                    .filter(a -> a.getFreelancer().getId().equals(freelancer.getId()))
                    .findFirst().orElse(null);
            Double proposedBudget = app == null ? null : app.getProposedBudget();
            CandidateScore s = scoreCandidate(freelancer, project, proposedBudget);
            scored.add(s);
        }

        return scored.stream()
                .sorted(Comparator.comparingDouble(CandidateScore::getScore).reversed())
                .limit(topN)
                .collect(Collectors.toList());
    }

    public CandidateScore scoreCandidate(User freelancer, Project project, Double proposedBudget) {

        Set<String> projectSkills = Optional.ofNullable(project.getSkillsNeeded()).orElse(Collections.emptySet())
                .stream().map(String::toLowerCase).collect(Collectors.toSet());
        Set<String> freelancerSkills = Optional.ofNullable(freelancer.getSkills()).orElse(Collections.emptySet())
                .stream().map(String::toLowerCase).collect(Collectors.toSet());



        double budgetTarget = project.getBudget() == null ? 0.0 : project.getBudget();
        double proposed = proposedBudget == null ? budgetTarget : proposedBudget;
        double budgetFit = 0.0;
        if (budgetTarget > 0 && proposed >= 0) {
            double diff = Math.abs(proposed - budgetTarget);
            budgetFit = 1.0 - Math.min(1.0, diff / Math.max(budgetTarget, proposed));
        }

        double ratingScore = 0.5;
        var reviews = reviewRepo.findByRevieweeId(freelancer.getId());
        if (!reviews.isEmpty()) {
            double avg = reviews.stream().mapToInt(r -> r.getRating()).average().orElse(3.0);
            ratingScore = (avg - 1.0) / 4.0;
        }

        List<Project> hired = projectRepo.findAll().stream()
                .filter(p -> p.getHiredFreelancer() != null && Objects.equals(p.getHiredFreelancer().getId(), freelancer.getId()))
                .collect(Collectors.toList());
        long totalHired = hired.size();
        long completed = hired.stream().filter(p -> p.getStatus() == Project.Status.COMPLETED).count();
        double completionRate = totalHired == 0 ? 0.5 : (double) completed / totalHired;

        double pastPerformance = 0.6 * ratingScore + 0.4 * completionRate;

        double semanticSkillScore = 0.5;
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("project_skills", project.getSkillsNeeded());
            payload.put("freelancer_skills", freelancer.getSkills());
            @SuppressWarnings("unchecked")
            Map<String, Object> resp = restTemplate.postForObject(semanticUrl, payload, Map.class);
            if (resp != null && resp.containsKey("score")) {
                Object val = resp.get("score");
                if (val instanceof Number) semanticSkillScore = ((Number) val).doubleValue();
            }
        } catch (Exception e) {
            logger.warn("Semantic API call failed for freelancer {}: {}", freelancer.getId(), e.getMessage());
        }

        double finalScore = W_SEMANTIC_SKILL * semanticSkillScore + W_BUDGET * budgetFit + W_PAST * pastPerformance;

        CandidateScore cs = new CandidateScore();
        cs.setFreelancerId(freelancer.getId());
        cs.setFreelancerUsername(freelancer.getUsername());
        cs.setScore(finalScore);
        cs.setBudgetFit(budgetFit);
        cs.setPastPerformance(pastPerformance);
        cs.setSemanticSkillMatch(semanticSkillScore);
        return cs;
    }
}
