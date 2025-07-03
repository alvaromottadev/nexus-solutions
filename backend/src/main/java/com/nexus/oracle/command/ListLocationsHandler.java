package com.nexus.oracle.command;

import com.nexus.dto.Location.LocationResponse;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.service.LocationService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ListLocationsHandler implements AiCommandHandler{

    private LocationService locationService;
    private MessageUtils messageUtils;

    public ListLocationsHandler(LocationService locationService, MessageUtils messageUtils) {
        this.locationService = locationService;
        this.messageUtils = messageUtils;
    }

    public String getName() {
        return "list_locations";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        List<LocationResponse> locations = locationService.getAllLocations(company);
        if (locations.isEmpty()) {
            return new AIResponse(
                    200,
                    originalResponseFromAI.header(),
                    new Message("text", null, messageUtils.getMessage("oracle.no.locations.found")),
                    null
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message("list", "location", locations),
                null
        );

    }

}
