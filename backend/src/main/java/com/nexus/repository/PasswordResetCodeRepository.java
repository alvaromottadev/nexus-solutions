package com.nexus.repository;

import com.nexus.model.PasswordResetCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode, String> {

    Optional<PasswordResetCode> findByResetCode(String resetCode);

    @Query("""
    SELECT c FROM PasswordResetCode c
        WHERE c.used OR c.expiredAt < CURRENT_TIMESTAMP
    """)
    List<PasswordResetCode> findAllExpiredOrUsedCodes();

}
