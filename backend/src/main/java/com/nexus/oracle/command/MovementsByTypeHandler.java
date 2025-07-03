package com.nexus.oracle.command;

import com.nexus.dto.Movement.MovementResponse;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.model.Movement;
import com.nexus.service.MovementService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovementsByTypeHandler implements AiCommandHandler {

    private final MessageUtils messageUtils;
    private final MovementService movementService;

    public MovementsByTypeHandler(MessageUtils messageUtils, MovementService movementService) {
        this.messageUtils = messageUtils;
        this.movementService = movementService;
    }

    @Override
    public String getName() {
        return "movements_by_type";
    }

    @Override
    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {

        String type = originalResponseFromAI.action().params().get("type").toString();
        String period = originalResponseFromAI.action().params().get("period").toString();

        List<MovementResponse> movementsByType = movementService.getMovementsByType(type, period, company);

        if (movementsByType.isEmpty()){
            return new AIResponse(
                    200,
                    originalResponseFromAI.header(),
                    new Message(
                            "text",
                            null,
                            messageUtils.getMessage("oracle.no.movements")
                    ),
                    null
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message(
                        "list",
                        "movement",
                        movementsByType
                ),
                null
        );
    }

}
