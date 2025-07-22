package com.nexus.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "password_reset_codes")
public class PasswordResetCode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "reset_code", unique = true, nullable = false)
    private String resetCode;

    private LocalDateTime expiredAt = LocalDateTime.now().plusHours(1);

    private boolean used = false;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne
    private User user;

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiredAt);
    }

    public PasswordResetCode(String resetCode, User user) {
        this.resetCode = resetCode;
        this.user = user;
        this.expiredAt = LocalDateTime.now().plusHours(1);
    }

}
