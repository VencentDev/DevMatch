package com.vencentdev.devmatch.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
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
}
