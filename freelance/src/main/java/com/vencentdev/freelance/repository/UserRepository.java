package com.vencentdev.freelance.repository;

import com.vencentdev.freelance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Resolve by either username OR email (useful for "login with email or username")
    Optional<User> findByUsernameOrEmail(String username, String email);

    // Convenience checks
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
