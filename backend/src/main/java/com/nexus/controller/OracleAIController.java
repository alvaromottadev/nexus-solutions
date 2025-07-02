package com.nexus.controller;

import com.nexus.dto.Oracle.AIRequest;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.OracleAIService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/oracle")
public class OracleAIController {

    private final OracleAIService oracleAIService;

    public OracleAIController(OracleAIService oracleAIService) {
        this.oracleAIService = oracleAIService;
    }

    @PostMapping
    public AIResponse askQuestion(@Validated @RequestBody AIRequest aiRequest,
                                  @AuthenticationPrincipal UserDetailsImpl userDetails){
        return oracleAIService.askQuestion(aiRequest, userDetails.getCompany().getId());
    }

}
