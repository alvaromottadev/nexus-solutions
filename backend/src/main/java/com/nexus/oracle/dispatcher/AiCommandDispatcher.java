package com.nexus.oracle.dispatcher;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.oracle.command.AiCommandHandler;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AiCommandDispatcher {

    private final Map<String, AiCommandHandler> handlers = new HashMap<>();
    private final MessageUtils messageUtils;

    public AiCommandDispatcher(List<AiCommandHandler> handlers, MessageUtils messageUtils) {
        for (AiCommandHandler handler : handlers){
            this.handlers.put(handler.getName(), handler);
        }
        this.messageUtils = messageUtils;
    }

    public AIResponse dispatch(AIResponse originalResponseFromAI, Company company){
        AiCommandHandler handler = handlers.get(originalResponseFromAI.action().name());
        if (handler == null){
            return new AIResponse(400, originalResponseFromAI.header(), new Message("text", null, messageUtils.getMessage("oracle.command.not.found")));
        }
        return handler.handle(originalResponseFromAI, company);
    }

}
