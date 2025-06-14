package com.nexus.controller;

import com.google.zxing.WriterException;
import com.nexus.dto.QrCode.QrCodeGenerateRequest;
import com.nexus.dto.QrCode.QrCodeGenerateResponse;
import com.nexus.service.QrCodeGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/qrcode")
public class QrCodeGeneratorController {

    private final QrCodeGeneratorService qrCodeGeneratorService;

    public QrCodeGeneratorController(QrCodeGeneratorService qrCodeGeneratorService) {
        this.qrCodeGeneratorService = qrCodeGeneratorService;
    }

    @PostMapping
    public ResponseEntity<QrCodeGenerateResponse> generate(@RequestBody QrCodeGenerateRequest request)  {
        try {
            QrCodeGenerateResponse response = qrCodeGeneratorService.generateAndUploadQrCode(request.content());
            return ResponseEntity.ok(response);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }

    }

}
