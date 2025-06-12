package com.nexus.service;

import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.Company;
import com.nexus.model.User;
import com.nexus.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company findByUser(User user){
        return companyRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found for user: " + user.getEmail()));
    }

    public Company save(Company company){
        return companyRepository.save(company);
    }

}
