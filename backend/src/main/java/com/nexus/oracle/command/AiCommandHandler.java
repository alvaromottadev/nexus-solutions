package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.model.Company;

public interface AiCommandHandler {

    String getName();
    AIResponse handle(AIResponse originalResponseFromAI, Company company);

}
