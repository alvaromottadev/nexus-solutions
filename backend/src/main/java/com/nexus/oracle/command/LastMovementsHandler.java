package com.nexus.oracle.command;

import com.nexus.dto.Movement.MovementResponse;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.model.Company;
import com.nexus.service.MovementService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LastMovementsHandler implements AiCommandHandler  {

    private final MovementService movementService;
    private final MessageUtils messageUtils;

    public LastMovementsHandler(MovementService movementService, MessageUtils messageUtils) {
        this.movementService = movementService;
        this.messageUtils = messageUtils;
    }

    public String getName() {
        return "list_last_movements";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        List<MovementResponse> lastMovements = movementService.getLastMovements(company);
        if (lastMovements.isEmpty()){
            return new AIResponse(
                    200,
                    originalResponseFromAI.header(),
                    new com.nexus.dto.Oracle.Message("text", null, messageUtils.getMessage("oracle.no.last.movements")),
                    null
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new com.nexus.dto.Oracle.Message("list", "movement", lastMovements),
                null
        );
    }
}
