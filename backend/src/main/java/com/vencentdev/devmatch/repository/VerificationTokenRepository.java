package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vencentdev.devmatch.model.User;

import java.util.List;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    List<VerificationToken> findAllByUser(User user);

}
