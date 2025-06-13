package com.nexus.controller;

import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @Validated @RequestBody UserEmployeeRegisterRequest employeeRequest){
        EmployeeResponse response = employeeService.createEmployee(employeeRequest, userDetails.getCompany());
        return ResponseEntity.status(201).body(response);
    }

}
