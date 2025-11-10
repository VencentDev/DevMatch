package com.vencentdev.devmatch.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "escrows")
public class Escrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "freelancer_id", nullable = false)
    private User freelancer;

    @Column(nullable = false)
    private Double amount;

    public enum Status { HELD, RELEASED, REFUNDED }

    @Enumerated(EnumType.STRING)
    private Status status = Status.HELD;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime completedAt;

    public Escrow() {}
    public Escrow(Project project, User client, User freelancer, Double amount) {
        this.project = project; this.client = client; this.freelancer = freelancer; this.amount = amount;
    }

    public Long getId() { return id; }
    public Project getProject() { return project; }
    public User getClient() { return client; }
    public User getFreelancer() { return freelancer; }
    public Double getAmount() { return amount; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
