// java
package com.vencentdev.devmatch.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double budget;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_skills", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "skill")
    private Set<String> skillsNeeded = new HashSet<>();

    private LocalDate deadline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hired_freelancer_id")
    private User hiredFreelancer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.OPEN;

    public enum Status { OPEN, IN_PROGRESS, COMPLETED }

    public Project() {}

    public Long getId() { return id; }
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
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public User getHiredFreelancer() { return hiredFreelancer; }
    public void setHiredFreelancer(User hiredFreelancer) { this.hiredFreelancer = hiredFreelancer; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
