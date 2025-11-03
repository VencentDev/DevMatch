// java
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
            Role clientRole = roleRepo.findByName("CLIENT")
                    .orElseGet(() -> roleRepo.save(new Role("CLIENT")));
            Role freelancerRole = roleRepo.findByName("FREELANCER")
                    .orElseGet(() -> roleRepo.save(new Role("FREELANCER")));
            Role adminRole = roleRepo.findByName("ADMIN")
                    .orElseGet(() -> roleRepo.save(new Role("ADMIN")));

            if (userRepo.findByUsername("freelancer").isEmpty()) {
                User freelancer = new User("freelancer","freelancer@gmail.com", encoder.encode("freelancer123"), Set.of(freelancerRole));
                userRepo.save(freelancer);
            }
            if (userRepo.findByUsername("client").isEmpty()) {
                User client = new User("client","client@gmail.com", encoder.encode("user123"), Set.of(clientRole));
                userRepo.save(client);
            }
            if (userRepo.findByUsername("admin").isEmpty()) {
                User admin = new User("admin","admin@gmail.com", encoder.encode("admin123"), Set.of(adminRole));
                userRepo.save(admin);
            }
        };
    }
}
