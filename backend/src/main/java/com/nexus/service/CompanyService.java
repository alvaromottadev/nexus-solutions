package com.nexus.service;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Company.CompanyUpdateRequest;
import com.nexus.dto.ImageResponse;
import com.nexus.dto.SuccessResponse;
import com.nexus.exception.CnpjDuplicateException;
import com.nexus.exception.CompanyNotFoundException;
import com.nexus.model.Address;
import com.nexus.model.Company;
import com.nexus.model.User;
import com.nexus.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserService userService;
    private final StorageService storageService;

    public CompanyService(CompanyRepository companyRepository, UserService userService, StorageService storageService) {
        this.companyRepository = companyRepository;
        this.userService = userService;
        this.storageService = storageService;
    }

    public List<CompanyResponse> getCompany(Integer size, Integer page){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return companyRepository.findAll(pageRequest).stream()
                .map(company -> new CompanyResponse(company, company.getCnpj()))
                .toList();
    }

    public CompanyResponse getCompanyById(String companyId){
        Company company = companyRepository.findById(companyId).orElseThrow(CompanyNotFoundException::new);
        return new CompanyResponse(company, company.getCnpj());
    }

    public CompanyResponse getMyCompany(Company company) {
        if (company == null) {
            throw new CompanyNotFoundException();
        }
        return new CompanyResponse(company, company.getCnpj());
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
    public ImageResponse updateCompanyLogo(MultipartFile file, Company company) {
        String logoUrl = storageService.uploadImage(file, "logo_" + company.getId());
        company.setLogo(logoUrl);
        companyRepository.save(company);
        return new ImageResponse(logoUrl);
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
