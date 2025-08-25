package com.nexus.controller;

import com.nexus.dto.MovementTool.MovementToolResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.MovementService;
import com.nexus.service.MovementToolService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tools")
public class MovementToolController {


    private final MovementToolService movementToolService;

    public MovementToolController(MovementToolService movementToolService) {
        this.movementToolService = movementToolService;
    }

    @PostMapping("/{code}")
    public ResponseEntity<MovementToolResponse> movementTool(@PathVariable String code,
                                                        @AuthenticationPrincipal UserDetailsImpl userDetails){
        MovementToolResponse response = movementToolService.movementTool(code, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<MovementToolResponse>> getMovementsTool(@AuthenticationPrincipal UserDetailsImpl userDetails){
        List<MovementToolResponse> response = movementToolService.getMovementsTool(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
