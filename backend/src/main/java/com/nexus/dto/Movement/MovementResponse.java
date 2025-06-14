package com.nexus.dto.Movement;

import com.nexus.dto.MovementItem.MovementItemResponse;
import com.nexus.model.Movement;
import com.nexus.model.enums.MovementType;

import java.time.LocalDateTime;
import java.util.List;

public record MovementResponse(

        String id,
        MovementType type,
        LocalDateTime movementDate,
        PerformedResponse performedBy,
        List<MovementItemResponse> items

) {

    public MovementResponse(Movement movement, PerformedResponse performedBy, List<MovementItemResponse> items) {
        this(
                movement.getId(),
                movement.getType(),
                movement.getMovementDate(),
                performedBy,
                items
        );
    }

}
