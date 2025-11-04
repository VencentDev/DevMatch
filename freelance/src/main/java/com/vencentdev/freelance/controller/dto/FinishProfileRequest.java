package com.vencentdev.freelance.controller.dto;

import java.util.Set;

public class FinishProfileRequest {
    private Set<String> roles;
    // add other profile fields as needed

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}
