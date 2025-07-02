package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;

public interface AiCommandHandler {

    public String getName();
    AIResponse handle(AIResponse originalResponseFromAI, String companyId);

}
