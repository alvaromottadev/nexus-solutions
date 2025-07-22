package com.nexus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexus.dto.Oracle.AIRequest;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.infra.OracleAIConfig;
import com.nexus.model.Company;
import com.nexus.oracle.dispatcher.AiCommandDispatcher;
import org.json.JSONArray;
import org.json.JSONObject;
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

            JSONObject body = createRequestBody(question);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body.toMap(), headers);

            String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
            ResponseEntity<Map> response = restTemplate.postForEntity(GEMINI_URL, request, Map.class);

            AIResponse aiResponse = processResponse(response);

            return aiResponse;

        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return new AIResponse(400, "Error", new Message("text", null, "An error occurred while processing your request."));
    }

    private JSONObject createRequestBody(String question){

        JSONObject body = new JSONObject();

        JSONArray contents = new JSONArray();

        JSONObject instruction = new JSONObject();
        instruction.put("role", "user");

        JSONArray instructionParts = new JSONArray();
        instructionParts.put(new JSONObject().put("text", prompt));

        instruction.put("parts", instructionParts);
        contents.put(instruction);

        JSONObject questionMessage = new JSONObject();
        questionMessage.put("role", "user");

        JSONArray questionParts = new JSONArray();

        questionParts.put(new JSONObject().put("text", question));

        questionMessage.put("parts", questionParts);

        contents.put(questionMessage);

        body.put("contents", contents);

        return body;
    }

    private AIResponse processResponse(ResponseEntity<Map> response) throws Exception {

        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> content = (Map<String, Object>) candidates.getFirst().get("content");

        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

        String context = (String) parts.getFirst().get("text");

        String rawJson = context.replaceAll("(?s)```json\\s*|\\s*```", "").trim();

        return objectMapper.readValue(rawJson, AIResponse.class);
    }

}
