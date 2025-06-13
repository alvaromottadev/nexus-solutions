package com.nexus.service;

import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final UserService userService;
    private final EmployeeRepository employeeRepository;

    public EmployeeService(UserService userService, EmployeeRepository employeeRepository) {
        this.userService = userService;
        this.employeeRepository = employeeRepository;
    }

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

    public List<EmployeeResponse> getAllEmployees(Company company) {
        List<Employee> employees = employeeRepository.findAllByCompany(company);
        return employees.stream()
                .map(EmployeeResponse::new)
                .toList();
    }

    private Employee findByIdAndCompany(String employeeId, Company company){
        return employeeRepository.findByIdAndCompany(employeeId, company)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

    private List<Employee> findAllByCompany(Company company){
        return employeeRepository.findAllByCompany(company);
    }

}
