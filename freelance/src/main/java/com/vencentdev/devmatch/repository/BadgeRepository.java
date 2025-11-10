// java
package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Badge;
import com.vencentdev.devmatch.model.Badge.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
    List<Badge> findByUserId(Long userId);
    Optional<Badge> findByUserIdAndType(Long userId, Type type);
    boolean existsByUserIdAndType(Long userId, Type type);
}
