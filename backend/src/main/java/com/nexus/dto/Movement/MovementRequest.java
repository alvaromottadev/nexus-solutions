package com.nexus.dto.Movement;

import com.nexus.dto.MovementItem.MovementItemRequest;
import com.nexus.model.enums.MovementType;

import java.time.LocalDateTime;
import java.util.List;

public record MovementRequest(

        MovementType type,
        String description,
        String locationId,
        LocalDateTime movementDate,
        List<MovementItemRequest> items

) {
}
