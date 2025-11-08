package com.vencentdev.freelance.service;

import com.vencentdev.freelance.model.*;
import com.vencentdev.freelance.repository.EscrowRepository;
import com.vencentdev.freelance.repository.TransactionRepository;
import com.vencentdev.freelance.repository.WalletRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
public class EscrowService {
    private final EscrowRepository escrowRepo;
    private final WalletRepository walletRepo;
    private final TransactionRepository txRepo;

    public EscrowService(EscrowRepository escrowRepo, WalletRepository walletRepo, TransactionRepository txRepo) {
        this.escrowRepo = escrowRepo; this.walletRepo = walletRepo; this.txRepo = txRepo;
    }

    @Transactional
    public Escrow holdFunds(User client, User freelancer, Project project, Double amount) {
        if (amount == null || amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        Wallet clientWallet = walletRepo.findByUserId(client.getId()).orElseThrow(() -> new IllegalStateException("Client has no wallet or insufficient funds"));
        if (clientWallet.getBalance() < amount) throw new IllegalStateException("Insufficient funds");
        // decrease client wallet
        clientWallet.setBalance(clientWallet.getBalance() - amount);
        clientWallet.setUpdatedAt(LocalDateTime.now());
        walletRepo.save(clientWallet);

        // create escrow
        Escrow escrow = new Escrow(project, client, freelancer, amount);
        escrow = escrowRepo.save(escrow);

        // record transaction
        txRepo.save(new Transaction(clientWallet, -amount, Transaction.Type.ESCROW_HOLD, escrow, "Hold for project " + project.getId()));
        return escrow;
    }

    @Transactional
    public void releaseEscrow(Long escrowId) {
        Escrow escrow = escrowRepo.findById(escrowId).orElseThrow(() -> new NoSuchElementException("Escrow not found"));
        if (escrow.getStatus() != Escrow.Status.HELD) throw new IllegalStateException("Escrow not in HELD state");
        Wallet freelancerWallet = walletRepo.findByUserId(escrow.getFreelancer().getId()).orElseGet(() -> {
            Wallet w = new Wallet(escrow.getFreelancer());
            return walletRepo.save(w);
        });
        // credit freelancer
        freelancerWallet.setBalance(freelancerWallet.getBalance() + escrow.getAmount());
        freelancerWallet.setUpdatedAt(LocalDateTime.now());
        walletRepo.save(freelancerWallet);

        // mark escrow released
        escrow.setStatus(Escrow.Status.RELEASED);
        escrow.setCompletedAt(LocalDateTime.now());
        escrowRepo.save(escrow);

        // record transaction
        txRepo.save(new Transaction(freelancerWallet, escrow.getAmount(), Transaction.Type.ESCROW_RELEASE, escrow, "Released for project " + escrow.getProject().getId()));
    }

    @Transactional
    public void refundEscrow(Long escrowId) {
        Escrow escrow = escrowRepo.findById(escrowId).orElseThrow(() -> new NoSuchElementException("Escrow not found"));
        if (escrow.getStatus() != Escrow.Status.HELD) throw new IllegalStateException("Escrow not in HELD state");
        Wallet clientWallet = walletRepo.findByUserId(escrow.getClient().getId()).orElseGet(() -> {
            Wallet w = new Wallet(escrow.getClient());
            return walletRepo.save(w);
        });
        clientWallet.setBalance(clientWallet.getBalance() + escrow.getAmount());
        clientWallet.setUpdatedAt(LocalDateTime.now());
        walletRepo.save(clientWallet);

        escrow.setStatus(Escrow.Status.REFUNDED);
        escrow.setCompletedAt(LocalDateTime.now());
        escrowRepo.save(escrow);

        txRepo.save(new Transaction(clientWallet, escrow.getAmount(), Transaction.Type.REFUND, escrow, "Refund for project " + escrow.getProject().getId()));
    }
}
