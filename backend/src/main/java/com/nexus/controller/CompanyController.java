package com.nexus.controller;

import com.nexus.dto.ImageResponse;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<CompanyResponse>> getCompany(@RequestParam(required = false, defaultValue = "10") Integer size,
                                                        @RequestParam(required = false, defaultValue = "0") Integer page) {
        List<CompanyResponse> response = companyService.getCompany(size, page);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyResponse> getCompanyById(@PathVariable String companyId){
        CompanyResponse response = companyService.getCompanyById(companyId);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('COMPANY')")
    @GetMapping("/me")
    public ResponseEntity<CompanyResponse> getMyCompany(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        CompanyResponse response = companyService.getMyCompany(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('COMPANY')")
    @PutMapping
    public ResponseEntity<CompanyResponse> updateCompany(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                            @Validated @RequestBody CompanyUpdateRequest companyUpdateRequest) {
        CompanyResponse response = companyService.updateCompany(companyUpdateRequest, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('COMPANY', 'MANAGER')")
    @PutMapping("/logo")
    public ResponseEntity<ImageResponse> updateCompanyLogo(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @RequestPart("logo") MultipartFile file){
        ImageResponse response = companyService.updateCompanyLogo(file, userDetails.getCompany());
        return ResponseEntity.ok(response);
    }


    @PreAuthorize("hasRole('COMPANY')")
    @DeleteMapping
    public ResponseEntity<SuccessResponse> deleteCompany(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        SuccessResponse response = companyService.deleteCompany(userDetails.getCompany());
        return ResponseEntity.ok(response);
    }

}
