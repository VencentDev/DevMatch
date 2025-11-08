package com.vencentdev.freelance.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum Type { DEPOSIT, ESCROW_HOLD, ESCROW_RELEASE, REFUND }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    private Type type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "escrow_id")
    private Escrow escrow; // optional link

    private String note;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Transaction() {}
    public Transaction(Wallet wallet, Double amount, Type type, Escrow escrow, String note) {
        this.wallet = wallet; this.amount = amount; this.type = type; this.escrow = escrow; this.note = note;
    }

    public Long getId() { return id; }
    public Wallet getWallet() { return wallet; }
    public Double getAmount() { return amount; }
    public Type getType() { return type; }
    public Escrow getEscrow() { return escrow; }
    public String getNote() { return note; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
