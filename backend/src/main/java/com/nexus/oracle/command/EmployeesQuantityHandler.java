package com.nexus.oracle.command;

import com.nexus.dto.Oracle.AIResponse;
import com.nexus.model.Company;
import com.nexus.service.EmployeeService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

@Component
public class EmployeesQuantityHandler implements AiCommandHandler {

    private final EmployeeService employeeService;
    private final MessageUtils messageUtils;

    public EmployeesQuantityHandler(EmployeeService employeeService, MessageUtils messageUtils) {
        this.employeeService = employeeService;
        this.messageUtils = messageUtils;
    }

    public String getName() {
        return "count_employees";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        Integer employeesQuantity = employeeService.getEmployeesQuantity(company);
        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new com.nexus.dto.Oracle.Message(
                        "text",
                        null,
                        messageUtils.getMessage("oracle.employees.quantity", employeesQuantity)
                ),
                null
        );
    }
}
