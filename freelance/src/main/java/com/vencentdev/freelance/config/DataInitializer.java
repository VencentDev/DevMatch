package com.vencentdev.freelance.config;

import com.vencentdev.freelance.model.Role;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.RoleRepository;
import com.vencentdev.freelance.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            Role clientRole = roleRepo.findByName("ROLE_CLIENT").orElseGet(() -> roleRepo.save(new Role("ROLE_CLIENT")));
            Role freelancerRole = roleRepo.findByName("ROLE_FREELANCER").orElseGet(() -> roleRepo.save(new Role("ROLE_FREELANCER")));

            if (userRepo.findByUsername("admin").isEmpty()) {
                User admin = new User("freelancer", encoder.encode("freelancer123"), Set.of(clientRole, freelancerRole));
                userRepo.save(admin);
            }
            if (userRepo.findByUsername("user").isEmpty()) {
                User user = new User("client", encoder.encode("user123"), Set.of(clientRole));
                userRepo.save(user);
            }
        };
    }
}
