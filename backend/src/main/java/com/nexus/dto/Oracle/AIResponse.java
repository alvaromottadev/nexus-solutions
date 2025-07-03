package com.nexus.dto.Oracle;


public record AIResponse(

        Integer status,
        String header,
        Message message,
        Action action,
        String author

) {

    public AIResponse(Integer status, String header, Message message) {
        this(status, header, message, null, "oracle");
    }

}
