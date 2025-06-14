package com.nexus.controller;

import com.nexus.dto.Movement.MovementRequest;
import com.nexus.dto.Movement.MovementResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Movement;
import com.nexus.model.enums.MovementType;
import com.nexus.service.MovementService;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/movements")
public class MovementController {

    private final MovementService movementService;

    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER', 'OPERATOR')")
    @PostMapping
    public ResponseEntity<MovementResponse> createMovement(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @Validated @RequestBody MovementRequest movementRequest) {
        MovementResponse response = movementService.createMovement(movementRequest, userDetails);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{movementId}")
    public ResponseEntity<MovementResponse> getMovementById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                            @PathVariable String movementId) {
        MovementResponse response = movementService.getMovementById(movementId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<MovementResponse>> getAllMovements(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                  @RequestParam(required = false) MovementType type,
                                                                  @RequestParam(required = false)LocalDateTime startDate,
                                                                  @RequestParam(required = false) LocalDateTime endDate) {
        List<MovementResponse> responses = movementService.getAllMovements(type, startDate, endDate, userDetails.getCompany());
        return ResponseEntity.ok(responses);
    }

}
