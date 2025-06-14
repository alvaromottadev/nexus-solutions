package com.nexus.dto.Movement;

import com.nexus.model.User;

public record PerformedResponse(

        String id,
        String name

) {

    public PerformedResponse(User user){
        this(
                user.getId(),
                user.getCompany() != null ? user.getCompany().getName() : user.getEmployee().getName()
        );
    }



}
