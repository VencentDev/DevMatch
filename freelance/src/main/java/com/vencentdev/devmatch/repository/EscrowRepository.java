package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Escrow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EscrowRepository extends JpaRepository<Escrow, Long> {
    Optional<Escrow> findByProjectId(Long projectId);
}
