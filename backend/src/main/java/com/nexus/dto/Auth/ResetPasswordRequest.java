package com.nexus.dto.Auth;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(

        @NotBlank(message = "Reset code cannot be blank")
        String resetCode,

        @NotBlank(message = "Password cannot be blank")
        String password,

        @NotBlank(message = "Confirm password cannot be blank")
        String confirmPassword

) {
}
