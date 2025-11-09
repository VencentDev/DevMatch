package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.controller.dto.ReviewRequest;
import com.vencentdev.devmatch.controller.dto.ReviewResponse;
import com.vencentdev.devmatch.model.Review;
import com.vencentdev.devmatch.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) { this.reviewService = reviewService; }

    @PostMapping("/projects/{projectId}")
    public ResponseEntity<?> leaveReview(@PathVariable Long projectId,
                                         @Valid @RequestBody ReviewRequest req,
                                         Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            Review r = reviewService.leaveReview(authentication.getName(), projectId, req);
            return ResponseEntity.status(201).body(Map.of("message", "Review created", "id", r.getId()));
        } catch (IllegalStateException | NoSuchElementException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> listForProject(@PathVariable Long projectId) {
        List<ReviewResponse> resp = reviewService.getByProject(projectId).stream().map(this::map).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> listForUser(@PathVariable Long userId) {
        List<ReviewResponse> resp = reviewService.getByReviewee(userId).stream().map(this::map).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    private ReviewResponse map(Review r) {
        ReviewResponse rr = new ReviewResponse();
        rr.setId(r.getId());
        rr.setReviewerId(r.getReviewer() == null ? null : r.getReviewer().getId());
        rr.setRevieweeId(r.getReviewee() == null ? null : r.getReviewee().getId());
        rr.setProjectId(r.getProject() == null ? null : r.getProject().getId());
        rr.setRating(r.getRating());
        rr.setComment(r.getComment());
        rr.setCreatedAt(r.getCreatedAt());
        return rr;
    }
}
