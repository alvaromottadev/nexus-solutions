package com.nexus.service;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.User;
import com.nexus.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final AddressService addressService;

    public CompanyService(CompanyRepository companyRepository, AddressService addressService) {
        this.companyRepository = companyRepository;
        this.addressService = addressService;
    }

    public CompanyResponse getCompany(Company company) {
        return new CompanyResponse(company);
    }

    @Transactional
    public CompanyResponse updateCompany(CompanyRequest companyRequest, Company company) {
        company.setName(companyRequest.name());
        company.setCnpj(companyRequest.cnpj());
        Address address = addressService.updateAddress(company.getAddress(), companyRequest.address());
        company.setAddress(address);
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
