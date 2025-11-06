// java
package com.vencentdev.freelance.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;

public class ProjectRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotNull
    private Double budget;
    private Set<String> skillsNeeded;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

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
}
