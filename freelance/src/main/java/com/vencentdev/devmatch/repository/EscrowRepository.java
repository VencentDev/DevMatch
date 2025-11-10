// java
package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Escrow;
import com.vencentdev.devmatch.model.Escrow.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EscrowRepository extends JpaRepository<Escrow, Long> {
    Optional<Escrow> findByProjectId(Long projectId);
    List<Escrow> findByFreelancerIdAndStatus(Long freelancerId, Status status);
    List<Escrow> findByFreelancerId(Long freelancerId);
    List<Escrow> findByClientId(Long clientId);
    List<Escrow> findByClientIdAndStatus(Long clientId, Status status);
}
