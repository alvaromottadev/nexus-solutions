package com.nexus.repository;

import com.nexus.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovementRepository extends JpaRepository<Movement, String> {
}
