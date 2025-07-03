package com.nexus.oracle.command;

import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Oracle.AIResponse;
import com.nexus.dto.Oracle.Message;
import com.nexus.model.Company;
import com.nexus.model.enums.EmployeeRole;
import com.nexus.service.EmployeeService;
import com.nexus.utils.MessageUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ListEmployeeByRole implements AiCommandHandler {

    private final EmployeeService employeeService;
    private final MessageUtils messageUtils;

    public ListEmployeeByRole(EmployeeService employeeService, MessageUtils messageUtils) {
        this.employeeService = employeeService;
        this.messageUtils = messageUtils;
    }

    public String getName() {
        return "list_employees_by_role";
    }

    public AIResponse handle(AIResponse originalResponseFromAI, Company company) {
        String role = originalResponseFromAI.action().params().get("role").toString();

        List<EmployeeResponse> employeesByRole = employeeService.getEmployeesByRole(EmployeeRole.valueOf(role), company);

        if (employeesByRole.isEmpty()){
            return new AIResponse(
                    200,
                    originalResponseFromAI.header(),
                    new Message(
                            "text",
                            null,
                            messageUtils.getMessage("oracle.no.employees.found.by.role")
                    )
            );
        }

        return new AIResponse(
                200,
                originalResponseFromAI.header(),
                new Message(
                        "list",
                        "employee",
                        employeesByRole
                )
        );
    }
}
