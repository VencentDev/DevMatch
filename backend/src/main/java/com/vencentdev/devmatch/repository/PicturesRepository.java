package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Pictures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PicturesRepository extends JpaRepository<Pictures, Long> {
    Optional<Pictures> findByUserId(Long userId);
}
