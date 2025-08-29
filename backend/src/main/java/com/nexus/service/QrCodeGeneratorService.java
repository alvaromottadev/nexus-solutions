package com.nexus.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.nexus.exception.QrCodeGenerateException;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class QrCodeGeneratorService {

    private final StorageService storageService;

    public QrCodeGeneratorService(StorageService storageService) {
        this.storageService = storageService;
    }

    public String generateQrCode(String content) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 200, 200);
            byte[] pngQrCodeData = generate(bitMatrix);
            return storageService.uploadQrCode(pngQrCodeData, UUID.randomUUID().toString());
        } catch (Exception e){
            throw new QrCodeGenerateException();
        }
    }

    public String generateBarCode(String code){
        try {
            MultiFormatWriter qrCodeWriter = new MultiFormatWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(code, BarcodeFormat.EAN_13, 300, 150);
            byte[] pngQrCodeData = generate(bitMatrix);
            return storageService.uploadQrCode(pngQrCodeData, UUID.randomUUID().toString());
        } catch (Exception e){
            throw new QrCodeGenerateException();
        }
    }

    private byte[] generate(BitMatrix bitMatrix) throws IOException {
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream.toByteArray();
    }



}
