package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProjectId(Long projectId);
    List<Review> findByRevieweeId(Long revieweeId);
    List<Review> findByReviewerId(Long reviewerId);
    Optional<Review> findByReviewerIdAndProjectId(Long reviewerId, Long projectId);
}
