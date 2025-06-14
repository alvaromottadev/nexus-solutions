package com.nexus.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitArray;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.nexus.dto.QrCode.QrCodeGenerateResponse;
import com.nexus.ports.StoragePort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class QrCodeGeneratorService {

    private final StoragePort storagePort;

    public QrCodeGeneratorService(StoragePort storagePort) {
        this.storagePort = storagePort;
    }

    public String generateQrCode(String content) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 200, 200);

            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
            byte[] pngQrCodeData = pngOutputStream.toByteArray();

            return uploadQrCode(pngQrCodeData, UUID.randomUUID().toString());
        } catch (Exception e){
            throw new RuntimeException("Failed to generate QR code", e);
        }

    }

    public String uploadQrCode(byte[] qrCodeData, String fileName) throws IOException {
        return storagePort.uploadFile(qrCodeData, fileName, "image/png");
    }

}
