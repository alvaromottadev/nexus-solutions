package com.nexus.controller;

import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.EmployeeUpdateByIdRequest;
import com.nexus.dto.Employee.EmployeeUpdateRequest;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


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

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                        @PathVariable String employeeId){
        EmployeeResponse response = employeeService.getEmployeeById(employeeId, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeResponse>> getAllEmployees(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                  @RequestParam(required = false) String name,
                                                                  @RequestParam(required = false, defaultValue = "0") Integer page,
                                                                  @RequestParam(required = false, defaultValue = "10") Integer size) {
        Page<EmployeeResponse> response = employeeService.getAllEmployees(name, page, size, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("#userDetails.type.name() == 'EMPLOYEE'")
    @PutMapping
    public ResponseEntity<EmployeeResponse> updateEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @Validated @RequestBody EmployeeUpdateRequest employeeUpdateRequest){
        EmployeeResponse response = employeeService.updateEmployee(userDetails.getEmployee(), employeeUpdateRequest);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PutMapping("/{employeeId}")
    public ResponseEntity<EmployeeResponse> updateEmployeeById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @PathVariable String employeeId,
                                                           @Validated @RequestBody EmployeeUpdateByIdRequest employeeRequest) {
        EmployeeResponse response = employeeService.updateEmployeeById(employeeId, employeeRequest, userDetails);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{employeeId}/avatar")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EmployeeResponse> updateEmployeeAvatar(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                 @PathVariable String employeeId,
                                                                 @RequestPart(value = "avatar") MultipartFile avatar) {
        EmployeeResponse response = employeeService.updateEmployeeAvatar(employeeId, avatar, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }


    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @DeleteMapping("/{employeeId}")
    public SuccessResponse deleteEmployee(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @PathVariable String employeeId) {
        return employeeService.deleteEmployee(employeeId, userDetails.getCompany());
    }

}
