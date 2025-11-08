package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.model.Transaction;
import com.vencentdev.freelance.model.Wallet;
import com.vencentdev.freelance.model.Escrow;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.TransactionRepository;
import com.vencentdev.freelance.repository.UserRepository;
import com.vencentdev.freelance.repository.WalletRepository;
import com.vencentdev.freelance.service.WalletService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {
    private static final Logger logger = LoggerFactory.getLogger(WalletController.class);
    private final WalletService walletService;
    private final UserRepository userRepo;
    private final WalletRepository walletRepo;
    private final TransactionRepository txRepo;

    public WalletController(WalletService walletService,
                            UserRepository userRepo,
                            WalletRepository walletRepo,
                            TransactionRepository txRepo) {
        this.walletService = walletService;
        this.userRepo = userRepo;
        this.walletRepo = walletRepo;
        this.txRepo = txRepo;
    }

    public static record DepositRequest(Double amount) {}

    @PostMapping("/deposit")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> deposit(@Valid @RequestBody DepositRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            Wallet w = walletService.deposit(authentication.getName(), req.amount());
            return ResponseEntity.status(200).body(Map.of("message", "Deposit successful", "wallet", Map.of(
                    "id", w.getId(),
                    "balance", w.getBalance()
            )));
        } catch (IllegalArgumentException | NoSuchElementException e) {
            logger.error("Deposit failed", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Deposit failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> myWallet(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }

        String username = authentication.getName();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // ensure wallet exists (create with 0 balance if missing)
        Wallet wallet = walletRepo.findByUserId(user.getId())
                .orElseGet(() -> {
                    Wallet w = new Wallet(user);
                    w.setBalance(0.0);
                    return walletRepo.save(w);
                });

        Map<String, Object> walletPayload = Map.of(
                "id", wallet.getId(),
                "balance", wallet.getBalance(),
                "createdAt", wallet.getCreatedAt(),
                "updatedAt", wallet.getUpdatedAt()
        );

        return ResponseEntity.ok(Map.of("wallet", walletPayload));
    }

    @GetMapping("/transactions")
    public ResponseEntity<?> listTransactions(@RequestParam(required = false) Long walletId,
                                              Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            Long targetWalletId = walletId;
            if (targetWalletId == null) {
                User user = userRepo.findByUsername(authentication.getName())
                        .orElseThrow(() -> new NoSuchElementException("User not found"));
                Wallet w = walletRepo.findByUserId(user.getId()).orElse(null);
                if (w == null) return ResponseEntity.ok(List.of());
                targetWalletId = w.getId();
            }

            // make a final copy for use inside the lambda (must be effectively final)
            final Long finalTargetWalletId = targetWalletId;

            List<Map<String, Object>> resp = txRepo.findAll().stream()
                    .filter(t -> t.getWallet() != null && finalTargetWalletId.equals(t.getWallet().getId()))
                    .map(t -> {
                        Map<String, Object> m = new HashMap<>();
                        m.put("id", t.getId());
                        m.put("amount", t.getAmount());
                        m.put("type", t.getType());
                        m.put("escrowId", t.getEscrow() == null ? null : t.getEscrow().getId());
                        m.put("note", t.getNote());
                        m.put("createdAt", t.getCreatedAt());
                        return m;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            logger.error("List transactions failed", e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }
}
