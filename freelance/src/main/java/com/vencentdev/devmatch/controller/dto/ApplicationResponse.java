package com.vencentdev.devmatch.controller.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {
    private Long id;
    private Long freelancerId;
    private String freelancerUsername;
    private String proposalText;
    private Double proposedBudget;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFreelancerId() { return freelancerId; }
    public void setFreelancerId(Long freelancerId) { this.freelancerId = freelancerId; }
    public String getFreelancerUsername() { return freelancerUsername; }
    public void setFreelancerUsername(String freelancerUsername) { this.freelancerUsername = freelancerUsername; }
    public String getProposalText() { return proposalText; }
    public void setProposalText(String proposalText) { this.proposalText = proposalText; }
    public Double getProposedBudget() { return proposedBudget; }
    public void setProposedBudget(Double proposedBudget) { this.proposedBudget = proposedBudget; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
