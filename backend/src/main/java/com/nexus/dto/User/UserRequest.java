package com.nexus.dto.User;

import com.nexus.model.enums.UserType;

public record UserRequest(

        String email,
        String password,
        UserType type

) {
}
