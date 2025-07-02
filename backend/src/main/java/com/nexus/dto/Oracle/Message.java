package com.nexus.dto.Oracle;

public record Message(

        String type,
        String schema,
        Object content

) {
}
