package com.nexus.service;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Company.CompanyUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.CnpjDuplicateException;
import com.nexus.exception.CompanyNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.User;
import com.nexus.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserService userService;

    public CompanyService(CompanyRepository companyRepository, UserService userService) {
        this.companyRepository = companyRepository;
        this.userService = userService;
    }

    public List<CompanyResponse> getCompany(Integer size, Integer page){
        PageRequest pageRequest = PageRequest.of(page, size);
        return companyRepository.findAll(pageRequest).stream()
                .map(CompanyResponse::new)
                .toList();
    }

    public CompanyResponse getMyCompany(Company company) {
        if (company == null) {
            throw new CompanyNotFoundException();
        }
        return new CompanyResponse(company);
    }

    public Company createCompany(User user, Address address, CompanyRequest companyRequest){
        existsByCnpj(companyRequest.cnpj());
        Company company = new Company(user, address, companyRequest);
        return save(company);
    }

    @Transactional
    public CompanyResponse updateCompany(CompanyUpdateRequest companyUpdateRequest, Company company) {

        userService.validatePassword(company.getUser(), companyUpdateRequest.password());
        userService.updateUserWithoutPassword(company.getUser(), companyUpdateRequest.email());

        company.update(companyUpdateRequest);
        companyRepository.save(company);

        return new CompanyResponse(company);
    }

    @Transactional
    public SuccessResponse deleteCompany(Company company){
        companyRepository.delete(company);
        return new SuccessResponse("Company deleted successfully");
    }

    public Company findByUser(User user){
        Company company = user.getCompany();
        if (company == null){
            company = user.getEmployee().getCompany();
        }
        return company;
    }

    public Company save(Company company){
        return companyRepository.save(company);
    }

    private void existsByCnpj(String cnpj){
        if (companyRepository.existsByCnpj(cnpj)) {
            throw new CnpjDuplicateException();
        }
    }

}
