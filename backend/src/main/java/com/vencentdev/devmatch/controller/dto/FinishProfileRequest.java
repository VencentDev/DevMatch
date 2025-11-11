// java
package com.vencentdev.devmatch.controller.dto;

import java.util.List;
import java.util.Set;

public class FinishProfileRequest {
    private String role;
    private String userType;


    private String fullName;
    private String country;
    private String address;
    private String phone;
    private String governmentIdUrl;

    private String title;
    private Set<String> skills;
    private List<String> links;
    private Set<String> languages;
    private Set<String> education;
    private Set<String> certifications;

    private String industry;
    private String paymentMethod;

    public FinishProfileRequest() {}

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getGovernmentIdUrl() { return governmentIdUrl; }
    public void setGovernmentIdUrl(String governmentIdUrl) { this.governmentIdUrl = governmentIdUrl; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Set<String> getSkills() { return skills; }
    public void setSkills(Set<String> skills) { this.skills = skills; }

    public List<String> getLinks() { return links; }
    public void setLinks(List<String> links) { this.links = links; }

    public Set<String> getLanguages() { return languages; }
    public void setLanguages(Set<String> languages) { this.languages = languages; }

    public Set<String> getEducation() { return education; }
    public void setEducation(Set<String> education) { this.education = education; }

    public Set<String> getCertifications() { return certifications; }
    public void setCertifications(Set<String> certifications) { this.certifications = certifications; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
