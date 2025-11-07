package com.vencentdev.freelance.repository;

import com.vencentdev.freelance.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByProjectId(Long projectId);
    Optional<Application> findByFreelancerIdAndProjectId(Long freelancerId, Long projectId);
}
