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
            Role clientRole = roleRepo.findByName("ROLE_CLIENT")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_CLIENT")));
            Role freelancerRole = roleRepo.findByName("ROLE_FREELANCER")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_FREELANCER")));
            Role adminRole = roleRepo.findByName("ROLE_ADMIN")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_ADMIN")));

            if (userRepo.findByUsername("freelancer").isEmpty()) {
                User freelancer = new User("freelancer",
                        "freelancer@gmail.com",
                        encoder.encode("Freelancer1!"),
                        Set.of(freelancerRole));
                freelancer.setEmailVerified(true);
                freelancer.setProfileCompleted(true);
                userRepo.save(freelancer);
            }
            if (userRepo.findByUsername("client").isEmpty()) {
                User client = new User("client",
                        "client@gmail.com",
                        encoder.encode("Client1!"),
                        Set.of(clientRole));
                client.setEmailVerified(true);
                client.setProfileCompleted(true);
                userRepo.save(client);
            }
            if (userRepo.findByUsername("admin").isEmpty()) {
                User admin = new User("admin",
                        "admin@gmail.com",
                        encoder.encode("Admin1!"),
                        Set.of(adminRole));
                admin.setEmailVerified(true);
                admin.setProfileCompleted(true);
                userRepo.save(admin);
            }
        };
    }
}
