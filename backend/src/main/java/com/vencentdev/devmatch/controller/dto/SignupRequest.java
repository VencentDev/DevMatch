
package com.vencentdev.devmatch.controller.dto;

import com.vencentdev.devmatch.validation.PasswordMatches;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@PasswordMatches
public class SignupRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    // Require at least 8 chars, 1 uppercase, 1 digit, 1 special char
    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$",
            message = "Password must be at least 8 chars and include 1 uppercase, 1 number and 1 special char")
    private String password;

    @NotBlank
    private String confirmPassword;

    public SignupRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
}
