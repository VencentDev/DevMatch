// java
package com.vencentdev.freelance.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.Set;

public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
    private Double budget;
    private Set<String> skillsNeeded;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    private UserSummary owner;

    // New: status and hired freelancer summary (nullable)
    private String status;
    private UserSummary hiredFreelancer;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }

    public Set<String> getSkillsNeeded() { return skillsNeeded; }
    public void setSkillsNeeded(Set<String> skillsNeeded) { this.skillsNeeded = skillsNeeded; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public UserSummary getOwner() { return owner; }
    public void setOwner(UserSummary owner) { this.owner = owner; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public UserSummary getHiredFreelancer() { return hiredFreelancer; }
    public void setHiredFreelancer(UserSummary hiredFreelancer) { this.hiredFreelancer = hiredFreelancer; }

    // Nested class for owner summary
    public static class UserSummary {
        private Long id;
        private String username;
        private String email;

        public UserSummary() {}

        public UserSummary(Long id, String username, String email) {
            this.id = id;
            this.username = username;
            this.email = email;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}
