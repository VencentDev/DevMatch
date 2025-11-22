package com.vencentdev.devmatch.controller.dto;

import java.util.List;

public class LoginResponse {

    private String email;
    private String username;
    private List<String> roles;
    private boolean profileCompleted;
    private boolean emailVerified;
    private String token;
    private String message;

    public LoginResponse() {}

    public LoginResponse(
            String username,
            String email,
            List<String> roles,
            boolean profileCompleted,
            boolean emailVerified,
            String token,
            String message
    ) {
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.profileCompleted = profileCompleted;
        this.emailVerified = emailVerified;
        this.token = token;
        this.message = message;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }

    public boolean isProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }

    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
