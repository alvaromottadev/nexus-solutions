package com.nexus.dto.User;

import com.nexus.model.User;
import com.nexus.model.enums.UserType;

public record UserResponse(

        String id,
        String email,
        UserType type

) {

    public UserResponse(User user){
        this(
                user.getId(),
                user.getEmail(),
                user.getType()
        );
    }

}
