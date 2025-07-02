package com.nexus.controller;

import com.nexus.service.OracleAIService;
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
    public String askQuestion(@RequestBody String question){
        return oracleAIService.askQuestion(question);
    }

}
