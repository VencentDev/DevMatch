// java
package com.vencentdev.devmatch.controller.dto;

import java.util.List;

public class LoginResponse {
    private String token;
    private String username;
    private boolean profileCompleted;
    private boolean emailVerified;
    private List<String> roles;
    private String message;

    public LoginResponse() {}

    public LoginResponse(String token, String username, boolean profileCompleted, boolean emailVerified, List<String> roles, String message) {
        this.token = token;
        this.username = username;
        this.profileCompleted = profileCompleted;
        this.emailVerified = emailVerified;
        this.roles = roles;
        this.message = message;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public boolean isProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }

    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }

    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
