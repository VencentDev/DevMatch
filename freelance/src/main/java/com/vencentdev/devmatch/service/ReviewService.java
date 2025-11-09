package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.controller.dto.ReviewRequest;
import com.vencentdev.devmatch.model.Escrow;
import com.vencentdev.devmatch.model.Project;
import com.vencentdev.devmatch.model.Review;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.EscrowRepository;
import com.vencentdev.devmatch.repository.ReviewRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepo;
    private final UserRepository userRepo;
    private final ProjectService projectService;
    private final EscrowRepository escrowRepo;

    public ReviewService(ReviewRepository reviewRepo, UserRepository userRepo, ProjectService projectService, EscrowRepository escrowRepo) {
        this.reviewRepo = reviewRepo;
        this.userRepo = userRepo;
        this.projectService = projectService;
        this.escrowRepo = escrowRepo;
    }

    @Transactional
    public Review leaveReview(String reviewerUsername, Long projectId, ReviewRequest req) {
        User reviewer = userRepo.findByUsername(reviewerUsername)
                .orElseThrow(() -> new NoSuchElementException("Reviewer not found"));
        User reviewee = userRepo.findById(req.getRevieweeId())
                .orElseThrow(() -> new NoSuchElementException("Reviewee not found"));
        Project project = projectService.getById(projectId);

        // require that an escrow exists and has been released before reviews are allowed
        Escrow escrow = escrowRepo.findByProjectId(projectId)
                .orElseThrow(() -> new IllegalStateException("Cannot leave review before escrow is created and released"));
        if (escrow.getStatus() != Escrow.Status.RELEASED) {
            throw new IllegalStateException("Reviews are allowed only after the escrow has been released");
        }

        // only participants may leave reviews
        boolean isOwner = project.getOwner().getId().equals(reviewer.getId());
        boolean isHired = project.getHiredFreelancer() != null && project.getHiredFreelancer().getId().equals(reviewer.getId());
        if (!isOwner && !isHired) throw new IllegalStateException("Only project participants can leave reviews for this project");

        // ensure reviewer is not reviewing themselves
        if (reviewer.getId().equals(reviewee.getId())) throw new IllegalStateException("Cannot review yourself");

        // ensure reviewee is the other project participant
        if (isOwner) {
            if (project.getHiredFreelancer() == null) {
                throw new IllegalStateException("Project has no hired freelancer to review");
            }
            if (!project.getHiredFreelancer().getId().equals(reviewee.getId())) {
                throw new IllegalStateException("You can only review the hired freelancer for this project");
            }
        } else { // reviewer is hired freelancer
            if (!project.getOwner().getId().equals(reviewee.getId())) {
                throw new IllegalStateException("You can only review the project owner for this project");
            }
        }

        // prevent duplicate review from same reviewer for same project
        if (reviewRepo.findByReviewerIdAndProjectId(reviewer.getId(), projectId).isPresent()) {
            throw new IllegalStateException("You have already reviewed this project");
        }

        Review r = new Review();
        r.setReviewer(reviewer);
        r.setReviewee(reviewee);
        r.setProject(project);
        r.setRating(req.getRating());
        r.setComment(req.getComment());
        Review saved = reviewRepo.save(r);

        // if the other participant already left a review, mark project COMPLETED
        Long otherParticipantId = isOwner ? project.getHiredFreelancer().getId() : project.getOwner().getId();
        boolean otherReviewed = reviewRepo.findByReviewerIdAndProjectId(otherParticipantId, projectId).isPresent();
        if (otherReviewed) {
            project.setStatus(Project.Status.COMPLETED);
            projectService.saveProject(project);
        }

        return saved;
    }

    public List<Review> getByProject(Long projectId) {
        return reviewRepo.findByProjectId(projectId);
    }

    public List<Review> getByReviewee(Long revieweeId) {
        return reviewRepo.findByRevieweeId(revieweeId);
    }
}
