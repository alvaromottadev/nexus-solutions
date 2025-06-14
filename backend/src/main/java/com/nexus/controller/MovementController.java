package com.nexus.controller;

import com.nexus.dto.Movement.MovementRequest;
import com.nexus.dto.Movement.MovementResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.MovementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/movements")
public class MovementController {

    private final MovementService movementService;

    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @PostMapping
    public ResponseEntity<MovementResponse> createMovement(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @Validated @RequestBody MovementRequest movementRequest) {
        MovementResponse response = movementService.createMovement(movementRequest, userDetails);
        return ResponseEntity.status(201).body(response);
    }

}
