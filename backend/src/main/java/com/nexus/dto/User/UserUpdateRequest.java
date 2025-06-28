package com.nexus.dto.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateRequest(

        @NotBlank(message = "Email is required")
        @Email(message = "Email is invalid")
        String email,

        @Size(min = 6, message = "Password must be at least 6 characters long")
        String password

) {
}
