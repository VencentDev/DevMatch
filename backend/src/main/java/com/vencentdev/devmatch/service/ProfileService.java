package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.controller.dto.FinishProfileRequest;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.RoleRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public ProfileService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    public Map<String, Object> finishProfile(String username, FinishProfileRequest req) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // Role assignment
        if (req.getRole() != null) {
            roleRepository.findByName(req.getRole())
                    .ifPresent(user::setRole);
        }

        // Common fields
        if (req.getFullName() != null) user.setFullName(req.getFullName());
        if (req.getCountry() != null) user.setCountry(req.getCountry());
        if (req.getAddress() != null) user.setAddress(req.getAddress());
        if (req.getPhone() != null) user.setPhone(req.getPhone());

        // Freelancer fields
        if (user.getRole() != null && user.getRole().getName().equalsIgnoreCase("FREELANCER")) {

            if (req.getIndustry() != null) user.setIndustry(req.getIndustry());
            if (req.getTitle() != null) user.setTitle(req.getTitle());
            if (req.getSkills() != null) user.setSkills(new HashSet<>(req.getSkills()));

            // Clear client-only fields if any existed previously
            user.setPaymentMethod(null);
        }

        // Client fields
        if (user.getRole() != null && user.getRole().getName().equalsIgnoreCase("CLIENT")) {

            // Clear freelancer data from old profile
            user.setIndustry(null);
            user.setTitle(null);
            user.setSkills(null);
        }

        user.setProfileCompleted(true);
        userRepository.save(user);

        return Map.of("message", "Profile updated successfully");
    }

}
