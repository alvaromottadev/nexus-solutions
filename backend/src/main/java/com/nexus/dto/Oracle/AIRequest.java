package com.nexus.dto.Oracle;

import jakarta.validation.constraints.NotNull;

public record AIRequest(

        @NotNull(message = "Question cannot be null")
        String question

) {
}
