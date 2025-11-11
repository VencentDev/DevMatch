// java
package com.vencentdev.devmatch.config;

import com.vencentdev.devmatch.model.Role;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.RoleRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

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
                User freelancer = new User();
                freelancer.setUsername("freelancer");
                freelancer.setEmail("freelancer@gmail.com");
                freelancer.setPassword(encoder.encode("Freelancer1!"));
                freelancer.setRole(freelancerRole);
                freelancer.setUserType(User.UserType.FREELANCER);
                freelancer.setEmailVerified(true);
                freelancer.setProfileCompleted(true);
                userRepo.save(freelancer);
            }

            if (userRepo.findByUsername("client").isEmpty()) {
                User client = new User();
                client.setUsername("client");
                client.setEmail("client@gmail.com");
                client.setPassword(encoder.encode("Client1!"));
                client.setRole(clientRole);
                client.setUserType(User.UserType.CLIENT);
                client.setEmailVerified(true);
                client.setProfileCompleted(true);
                userRepo.save(client);
            }

            if (userRepo.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("Admin1!"));
                admin.setRole(adminRole);
                admin.setUserType(User.UserType.UNKNOWN);
                admin.setEmailVerified(true);
                admin.setProfileCompleted(true);
                userRepo.save(admin);
            }
        };
    }
}
