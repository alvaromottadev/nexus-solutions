package com.nexus.dto.Oracle;


public record AIResponse(

        Integer status,
        String header,
        Message message,
        Action action

) {

}
