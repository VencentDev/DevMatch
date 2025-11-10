package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
