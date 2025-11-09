package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.model.Transaction;
import com.vencentdev.devmatch.model.Wallet;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.TransactionRepository;
import com.vencentdev.devmatch.repository.WalletRepository;
import com.vencentdev.devmatch.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
public class WalletService {
    private final WalletRepository walletRepo;
    private final TransactionRepository txRepo;
    private final UserRepository userRepo;

    public WalletService(WalletRepository walletRepo, TransactionRepository txRepo, UserRepository userRepo) {
        this.walletRepo = walletRepo; this.txRepo = txRepo; this.userRepo = userRepo;
    }

    @Transactional
    public Wallet deposit(String username, Double amount) {
        if (amount == null || amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        User user = userRepo.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
        Wallet wallet = walletRepo.findByUserId(user.getId()).orElseGet(() -> {
            Wallet w = new Wallet(user);
            return walletRepo.save(w);
        });
        wallet.setBalance(wallet.getBalance() + amount);
        wallet.setUpdatedAt(java.time.LocalDateTime.now());
        wallet = walletRepo.save(wallet);
        txRepo.save(new Transaction(wallet, amount, Transaction.Type.DEPOSIT, null, "Deposit simulated"));
        return wallet;
    }

    public Wallet getWalletForUserId(Long userId) {
        return walletRepo.findByUserId(userId).orElse(null);
    }
}
