package com.nexus.dto.Movement;

import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.MovementItem.MovementItemResponse;
import com.nexus.model.Movement;
import com.nexus.model.enums.MovementType;

import java.time.LocalDateTime;
import java.util.List;

public record MovementResponse(

        String id,
        MovementType type,
        String description,
        LocalDateTime movementDate,
        PerformedResponse performedBy,
        String location,
        List<MovementItemResponse> items

) {

    public MovementResponse(Movement movement, List<MovementItemResponse> items) {
        this(
                movement.getId(),
                movement.getType(),
                movement.getDescription(),
                movement.getMovementDate(),
                new PerformedResponse(movement.getPerformedBy()),
                movement.getLocation().getName(),
                items
        );
    }

}
