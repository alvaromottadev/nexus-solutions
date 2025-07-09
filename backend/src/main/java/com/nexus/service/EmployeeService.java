package com.nexus.service;

import com.nexus.dto.ImageResponse;
import com.nexus.dto.Employee.EmployeeResponse;
import com.nexus.dto.Employee.EmployeeUpdateByIdRequest;
import com.nexus.dto.Employee.EmployeeUpdateRequest;
import com.nexus.dto.Employee.UserEmployeeRegisterRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.EmployeeNotFoundException;
import com.nexus.exception.InvalidEmployeeRegistrationException;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

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
        validateEmployeeRegistrationAsCompany(employeeRequest.user().type());
        User user = userService.createUser(employeeRequest.user());
        Employee employee = new Employee(employeeRequest.employee(), user, company);
        employeeRepository.save(employee);
        return new EmployeeResponse(employee);
    }

    public EmployeeResponse getEmployeeById(String employeeId, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        return new EmployeeResponse(employee);
    }

    public EmployeeResponse getMyEmployee(Employee employee){
        if (employee == null) {
            throw new EmployeeNotFoundException();
        }
        return new EmployeeResponse(employee);
    }

    public Page<EmployeeResponse> getAllEmployees(String name, Integer page, Integer size, Company company) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return employeeRepository.findAll(EmployeeSpecification.filterBy(name, company), pageRequest).map(EmployeeResponse::new);
    }

    @Transactional
    public EmployeeResponse updateEmployee(Employee employee, EmployeeUpdateRequest employeeUpdateRequest){

        userService.validatePassword(employee.getUser(), employeeUpdateRequest.password());
        userService.updateUserWithoutPassword(employee.getUser(), employeeUpdateRequest.email());

        employee.update(employeeUpdateRequest.name());

        employeeRepository.save(employee);
        return new EmployeeResponse(employee);
    }

    @Transactional
    public EmployeeResponse updateEmployeeById(String employeeId, EmployeeUpdateByIdRequest employeeUpdateRequest, UserDetailsImpl userDetails) {
        Employee employee = findByIdAndCompany(employeeId, userDetails.getCompany());

        userService.updateUserWithPassword(employee.getUser(), employeeUpdateRequest.user().email(), employeeUpdateRequest.user().password());
        employee.update(employeeUpdateRequest);

        return new EmployeeResponse(employee);
    }

    @Transactional
    public ImageResponse updateEmployeeAvatarById(String employeeId, MultipartFile avatar, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        String avatarUrl = uploadAvatar(employee, avatar);
        return new ImageResponse(avatarUrl);
    }

    @Transactional
    public ImageResponse updateEmployeeAvatar(Employee employee, MultipartFile avatar){
        String avatarUrl = uploadAvatar(employee, avatar);
        return new ImageResponse(avatarUrl);
    }

    @Transactional
    public SuccessResponse deleteEmployee(String employeeId, Company company) {
        Employee employee = findByIdAndCompany(employeeId, company);
        employee.setDeletedAt(LocalDateTime.now());
        employeeRepository.save(employee);
        return new SuccessResponse(messageUtils.getMessage("employee.deleted.success"));
    }

    public Integer getEmployeesQuantity(Company company){
        return employeeRepository.getEmployeesQuantity(company).orElse(0);
    }

    public List<EmployeeResponse> getEmployeesByRole(EmployeeRole role, Company company) {
        List<Employee> employees = employeeRepository.getEmployeesByRole(role, company);
        return employees.stream()
                .map(EmployeeResponse::new)
                .toList();
    }

    private Employee findByIdAndCompany(String employeeId, Company company){
        return employeeRepository.findByIdAndCompanyAndDeletedAtIsNull(employeeId, company)
                .orElseThrow((EmployeeNotFoundException::new));
    }

    private String uploadAvatar(Employee employee, MultipartFile avatar){
        String avatarUrl = storageService.uploadImage(avatar, "avatar_" + employee.getId());
        employee.setAvatar(avatarUrl);
        employeeRepository.save(employee);
        return avatarUrl;
    }

    private void validateEmployeeRegistrationAsCompany(UserType userType) {
        if (userType == UserType.COMPANY) {
            throw new InvalidEmployeeRegistrationException();
        }
    }

}
