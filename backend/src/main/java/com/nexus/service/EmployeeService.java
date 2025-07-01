package com.nexus.service;

import com.nexus.dto.Employee.EmployeeRequest;
import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.EmployeeUpdateRequest;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.EmployeeNotFoundException;
import com.nexus.exception.UnauthorizedRoleChangeException;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.model.enums.EmployeeRole;
import com.nexus.model.enums.UserType;
import com.nexus.repository.EmployeeRepository;
import com.nexus.repository.specification.EmployeeSpecification;
import com.nexus.utils.MessageUtils;
import jakarta.transaction.Transactional;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
public class EmployeeService {

    private final UserService userService;
    private final EmployeeRepository employeeRepository;
    private final StorageService storageService;
    private final MessageUtils messageUtils;

    public EmployeeService(UserService userService, EmployeeRepository employeeRepository, StorageService storageService, MessageUtils messageUtils) {
        this.userService = userService;
        this.employeeRepository = employeeRepository;
        this.storageService = storageService;
        this.messageUtils = messageUtils;
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
    public EmployeeResponse updateEmployee(String employeeId, EmployeeUpdateRequest employeeUpdateRequest, UserDetailsImpl userDetails) {
        Employee employee = findByIdAndCompany(employeeId, userDetails.getCompany());

        if (employeeUpdateRequest.role() != null)
            if (!isRoleChangeAllowed(userDetails)) throw new UnauthorizedRoleChangeException();

        if (!employee.getUser().getEmail().equals(employeeUpdateRequest.user().email())) userService.existsByEmail(employeeUpdateRequest.user().email());

        userService.updateUser(employee.getUser(), employeeUpdateRequest.user());
        employee.update(employeeUpdateRequest);

        return new EmployeeResponse(employee);
    }

    @Transactional
    public EmployeeResponse updateEmployeeAvatar(String employeeId, MultipartFile avatar, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        String avatarUrl = storageService.uploadImage(avatar, "avatar_" + employee.getId());
        employee.setAvatar(avatarUrl);
        return new EmployeeResponse(employee);
    }

    @Transactional
    public SuccessResponse deleteEmployee(String employeeId, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        employee.setDeletedAt(LocalDateTime.now());
        employeeRepository.save(employee);
        return new SuccessResponse(messageUtils.getMessage("employee.deleted.success"));
    }

    private Employee findByIdAndCompany(String employeeId, Company company){
        return employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeId, company)
                .orElseThrow((EmployeeNotFoundException::new));
    }

    private boolean isRoleChangeAllowed(UserDetailsImpl userDetails) {
        UserType currentType = userDetails.getType();
        return (currentType == UserType.COMPANY || (currentType == UserType.EMPLOYEE && userDetails.getEmployee().getRole() == EmployeeRole.MANAGER));
    }

}
