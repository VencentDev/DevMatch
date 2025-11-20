// java
package com.vencentdev.devmatch.controller.dto;

import java.util.List;
import java.util.Set;

public class ProfileResponse {
    private Long id;
    private String username;
    private String email;
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
    private boolean emailVerified;
    private boolean profileCompleted;
    private String userType;
    private String kycStatus;
    private String role;

    public ProfileResponse() {}

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

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

    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }

    public boolean isProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }

    public String getKycStatus() { return kycStatus; }
    public void setKycStatus(String kycStatus) { this.kycStatus = kycStatus; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
