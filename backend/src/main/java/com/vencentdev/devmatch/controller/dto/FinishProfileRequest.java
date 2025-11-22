package com.vencentdev.devmatch.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class FinishProfileRequest {

    private String role; // freelancer / client

    // common fields
    private String fullName;
    private String country;
    private String address;
    private String phone;

    // freelancer-only
    private String industry;
    private String title;
    private Set<String> skills;
}
