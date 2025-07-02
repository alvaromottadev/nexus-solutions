package com.nexus.dto.Oracle;

import java.util.Map;

public record Action(

        String name,
        Map<String, Object> params

) {
}
