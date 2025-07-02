package com.nexus.service;

import com.nexus.infra.OracleAIConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;


@Service
public class OracleAIService {

    @Value("${oracle.prompt}")
    private String prompt;

    @Value("${oracle.url}")
    private String OPENAI_URL;

    private final OracleAIConfig config;

    private final RestTemplate restTemplate;

    public OracleAIService(OracleAIConfig config, RestTemplateBuilder builder) {
        this.config = config;
        this.restTemplate = builder.build();
    }

    public String askQuestion(String question){
        HttpHeaders headers = config.defaultHeaders();

        Map<String, Object> system = Map.of(
                "role", "system",
                "content", prompt
        );
        Map<String, Object> user = Map.of(
                "role", "user",
                "content", question
        );

        Map<String, Object> body = Map.of(
                "model", "meta-llama/Llama-3-8b-chat-hf",
                "messages", List.of(system, user)
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, request, Map.class);

        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");

        Map<String,Object> message = (Map<String, Object>) choices.get(0).get("message");
        return message.get("content").toString();

    }

}
