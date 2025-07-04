package com.nexus.dto.Auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordUpdateRequest (

        @NotBlank(message = "Old password is required")
        @Size(min = 6, message = "Old password must be at least 6 characters long")
        String oldPassword,

        @NotBlank(message = "New password is required")
        @Size(min = 6, message = "New password must be at least 6 characters long")
        String newPassword

){
}
