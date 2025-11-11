package com.vencentdev.devmatch.controller.dto;


public class CandidateScore {
    private Long freelancerId;
    private String freelancerUsername;
    private double score;
    private double semanticSkillMatch;
    private double budgetFit;
    private double pastPerformance;


    public Long getFreelancerId() { return freelancerId; }
    public void setFreelancerId(Long freelancerId) { this.freelancerId = freelancerId; }
    public String getFreelancerUsername() { return freelancerUsername; }
    public void setFreelancerUsername(String freelancerUsername) { this.freelancerUsername = freelancerUsername; }
    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
    public double getSemanticSkillMatch() { return semanticSkillMatch; }
    public void setSemanticSkillMatch(double semanticSkillMatch) { this.semanticSkillMatch = semanticSkillMatch; }
    public double getBudgetFit() { return budgetFit; }
    public void setBudgetFit(double budgetFit) { this.budgetFit = budgetFit; }
    public double getPastPerformance() { return pastPerformance; }
    public void setPastPerformance(double pastPerformance) { this.pastPerformance = pastPerformance; }

}