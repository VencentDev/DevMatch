// java
package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.model.Badge;
import com.vencentdev.devmatch.model.Badge.Type;
import com.vencentdev.devmatch.model.Escrow;
import com.vencentdev.devmatch.model.Project;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.BadgeRepository;
import com.vencentdev.devmatch.repository.EscrowRepository;
import com.vencentdev.devmatch.repository.ProjectRepository;
import com.vencentdev.devmatch.repository.ReviewRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class BadgeService {
    private static final Logger logger = LoggerFactory.getLogger(BadgeService.class);

    private final BadgeRepository badgeRepo;
    private final ReviewRepository reviewRepo;
    private final ProjectRepository projectRepo;
    private final EscrowRepository escrowRepo;
    private final UserRepository userRepo;

    public BadgeService(BadgeRepository badgeRepo,
                        ReviewRepository reviewRepo,
                        ProjectRepository projectRepo,
                        EscrowRepository escrowRepo,
                        UserRepository userRepo) {
        this.badgeRepo = badgeRepo;
        this.reviewRepo = reviewRepo;
        this.projectRepo = projectRepo;
        this.escrowRepo = escrowRepo;
        this.userRepo = userRepo;
    }

    /**
     * Evaluate and award/remove badges for a freelancer user.
     * Designed to be called after relevant events (review created, project completed, escrow released).
     */
    @Transactional
    public void evaluateBadgesForUser(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        // compute average rating
        List<com.vencentdev.devmatch.model.Review> reviews = reviewRepo.findByRevieweeId(userId);
        double avgRating = reviews.stream().mapToInt(r -> r.getRating()).average().orElse(Double.NaN);

        // Top Rated: avg >= 4.0 (require at least one review)
        if (!Double.isNaN(avgRating) && avgRating >= 4.0) {
            awardIfMissing(user, Type.TOP_RATED, "Average rating >= 4.0 (top rated freelancer)");
        }

        // Rising Star: completed projects >= 3 and avg rating >= 4.5
        long completedCount = projectRepo.findAll().stream()
                .filter(p -> p.getHiredFreelancer() != null
                        && p.getHiredFreelancer().getId().equals(userId)
                        && p.getStatus() == Project.Status.COMPLETED)
                .count();
        if (completedCount >= 3 && !Double.isNaN(avgRating) && avgRating >= 4.5) {
            awardIfMissing(user, Type.RISING_STAR, "Completed >= 3 projects with high ratings (rising star)");
        }

        // Fast Finisher: use escrow release durations (requires >=3 released escrows and avg duration <= 14 days)
        List<Escrow> released = escrowRepo.findByFreelancerIdAndStatus(userId, Escrow.Status.RELEASED);
        if (!released.isEmpty()) {
            OptionalDouble avgDays = released.stream()
                    .filter(e -> e.getCreatedAt() != null && e.getCompletedAt() != null)
                    .mapToLong(e -> Duration.between(e.getCreatedAt(), e.getCompletedAt()).toDays())
                    .average();
            if (released.size() >= 3 && avgDays.isPresent() && avgDays.getAsDouble() <= 14.0) {
                awardIfMissing(user, Type.FAST_FINISHER, "Average completion time <= 14 days (fast finisher)");
            }
        }

        // (Optional) remove badges that no longer apply - left out for brevity (can implement if desired)
    }

    private void awardIfMissing(User user, Type type, String description) {
        if (!badgeRepo.existsByUserIdAndType(user.getId(), type)) {
            Badge b = new Badge(user, type, description);
            badgeRepo.save(b);
            logger.info("Awarded badge {} to user {}", type, user.getUsername());
        }
    }

    public List<Badge> listBadgesForUser(Long userId) {
        return badgeRepo.findByUserId(userId);
    }
}
