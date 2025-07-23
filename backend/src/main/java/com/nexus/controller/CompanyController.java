package com.nexus.controller;

import com.nexus.dto.ImageResponse;
import com.nexus.dto.Company.CompanyResponse;
import com.nexus.dto.Company.CompanyUpdateRequest;
import com.nexus.dto.SuccessResponse;
import com.nexus.infra.security.UserDetailsImpl;
import com.nexus.openapi.CompanyControllerOpenApi;
import com.nexus.service.CompanyService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController implements CompanyControllerOpenApi {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
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
    @PutMapping(path = "/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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
