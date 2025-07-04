package com.nexus.controller;

import com.nexus.dto.Company.CompanyRequest;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Company.CompanyUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<CompanyResponse> getCompany(@AuthenticationPrincipal UserDetailsImpl userDetails){
        CompanyResponse response = companyService.getCompany(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('COMPANY')")
    @PutMapping
    public ResponseEntity<CompanyResponse> updateCompany(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                            @Validated @RequestBody CompanyUpdateRequest companyUpdateRequest) {
        CompanyResponse response = companyService.updateCompany(companyUpdateRequest, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('COMPANY')")
    @DeleteMapping
    public ResponseEntity<SuccessResponse> deleteCompany(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        SuccessResponse response = companyService.deleteCompany(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
