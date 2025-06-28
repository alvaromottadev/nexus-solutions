package com.nexus.service;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.User;
import com.nexus.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public CompanyResponse getCompany(Company company) {
        return new CompanyResponse(company);
    }

    @Transactional
    public Company createCompany(User user, Address address, CompanyRequest companyRequest){
        Company company = new Company(user, address, companyRequest);
        return save(company);
    }

    @Transactional
    public CompanyResponse updateCompany(CompanyRequest companyRequest, Company company) {
        company.update(companyRequest);
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

}
