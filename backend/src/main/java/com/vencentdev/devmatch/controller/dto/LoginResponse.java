package com.vencentdev.devmatch.controller.dto;

public class LoginResponse {

    private String email;
    private String username;   // optional
    private boolean profileCompleted;
    private boolean emailVerified;
    private String message;

    public LoginResponse() {}

    public LoginResponse(String email, String username,
                         boolean profileCompleted, boolean emailVerified,
                         String message) {
        this.email = email;
        this.username = username;
        this.profileCompleted = profileCompleted;
        this.emailVerified = emailVerified;
        this.message = message;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public boolean isProfileCompleted() { return profileCompleted; }
    public void setProfileCompleted(boolean profileCompleted) { this.profileCompleted = profileCompleted; }

    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
