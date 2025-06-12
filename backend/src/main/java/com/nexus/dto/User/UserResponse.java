package com.nexus.dto.User;

import com.nexus.model.User;
import com.nexus.model.enums.UserType;

public record UserResponse(

        String email,
        UserType type

) {

    public UserResponse(User user){
        this(
                user.getEmail(),
                user.getType()
        );
    }

}
