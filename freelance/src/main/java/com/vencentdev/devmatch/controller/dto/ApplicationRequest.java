package com.vencentdev.devmatch.controller.dto;

public class ApplicationRequest {
    private String proposalText;
    private Double proposedBudget;

    public String getProposalText() { return proposalText; }
    public void setProposalText(String proposalText) { this.proposalText = proposalText; }
    public Double getProposedBudget() { return proposedBudget; }
    public void setProposedBudget(Double proposedBudget) { this.proposedBudget = proposedBudget; }
}
