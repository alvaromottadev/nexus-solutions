package com.nexus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexus.dto.Oracle.AIRequest;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.infra.OracleAIConfig;
import com.nexus.model.Company;
import com.nexus.oracle.dispatcher.AiCommandDispatcher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;


@Service
public class OracleAIService {

    private final AiCommandDispatcher aiCommandDispatcher;
    @Value("${oracle.prompt}")
    private String prompt;

    @Value("${oracle.url}")
    private String OPENAI_URL;

    private final OracleAIConfig config;

    private final RestTemplate restTemplate;

    public OracleAIService(OracleAIConfig config, RestTemplateBuilder builder, AiCommandDispatcher aiCommandDispatcher) {
        this.config = config;
        this.restTemplate = builder.build();
        this.aiCommandDispatcher = aiCommandDispatcher;
    }

    public AIResponse askQuestion(AIRequest aiRequest, Company company){

        AIResponse originalResponseFromAI = sendToAI(aiRequest.question());

        if (originalResponseFromAI.status() == 200 || originalResponseFromAI.action() == null){
            return originalResponseFromAI;
        }

        AIResponse response = aiCommandDispatcher.dispatch(originalResponseFromAI, company);
        return response;

    }

    private AIResponse sendToAI(String question){
        try {
            HttpHeaders headers = config.defaultHeaders();

            Map<String, Object> body = createRequestBody(question);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, request, Map.class);

            AIResponse aiResponse = processResponse(response);

            return aiResponse;

        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return new AIResponse(400, "Error", new Message("text", null, "An error occurred while processing your request."), null);
    }

    private Map<String, Object> createRequestBody(String question){
        Map<String, Object> system = Map.of(
                "role", "system",
                "content", prompt
        );
        Map<String, Object> user = Map.of(
                "role", "user",
                "content", question
        );

        return Map.of(
                "model", "meta-llama/Llama-3-8b-chat-hf",
                "messages", List.of(system, user)
        );

    }

    private AIResponse processResponse(ResponseEntity<Map> response) throws Exception {
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> rawAiMessage = (Map<String, Object>) choices.get(0).get("message");

        String rawJson = rawAiMessage.get("content").toString();
        return objectMapper.readValue(rawJson, AIResponse.class);
    }

}
