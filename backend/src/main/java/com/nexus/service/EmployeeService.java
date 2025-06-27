package com.nexus.service;

import com.nexus.dto.Employee.EmployeeRequest;
import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.repository.EmployeeRepository;
import com.nexus.repository.specification.EmployeeSpecification;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmployeeService {

    private final UserService userService;
    private final EmployeeRepository employeeRepository;

    public EmployeeService(UserService userService, EmployeeRepository employeeRepository) {
        this.userService = userService;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public EmployeeResponse createEmployee(UserEmployeeRegisterRequest employeeRequest, Company company){
        User user = userService.createUser(employeeRequest.user());
        Employee employee = new Employee(employeeRequest.employee(), user, company);
        employeeRepository.save(employee);
        return new EmployeeResponse(employee);
    }

    public EmployeeResponse getEmployeeById(String employeeId, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        return new EmployeeResponse(employee);
    }

    public Page<EmployeeResponse> getAllEmployees(String name, Integer page, Integer size, Company company) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return employeeRepository.findAll(EmployeeSpecification.filterBy(name, company), pageRequest).map(EmployeeResponse::new);
    }

    @Transactional
    public EmployeeResponse updateEmployee(String employeeId, EmployeeRequest employeeRequest, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        employee.setName(employeeRequest.name());
        employee.setRole(employeeRequest.role());
        employee.setUpdatedAt(LocalDateTime.now());
        employeeRepository.save(employee);
        return new EmployeeResponse(employee);
    }

    @Transactional
    public SuccessResponse deleteEmployee(String employeeId, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        employee.setDeletedAt(LocalDateTime.now());
        employeeRepository.save(employee);
        return new SuccessResponse("Employee deleted successfully");
    }

    private Employee findByIdAndCompany(String employeeId, Company company){
        return employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeId, company)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

}
