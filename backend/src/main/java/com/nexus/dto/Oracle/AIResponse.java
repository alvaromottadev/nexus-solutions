package com.nexus.dto.Oracle;

import java.util.Map;

public record AIResponse(

        Integer status,
        String header,
        Message message,
        Action action

) {

    public AIResponse(Map<String, Object> message){
        this(
            (Integer) message.get("status"),
            (String) message.get("header"),
            new Message(
                (String) message.get("message.type"),
                (String) message.get("message.schema"),
                message.get("message.content")
            ),
            null
        );
    }

}
