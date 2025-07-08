package com.nexus.service;

import com.nexus.exception.FormatInvalidException;
import com.nexus.ports.StoragePort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class StorageService {

    private final StoragePort storagePort;

    public StorageService(StoragePort storagePort) {
        this.storagePort = storagePort;
    }

    public String uploadQrCode(byte[] fileData, String fileName)  {
        return storagePort.uploadFile(fileData, fileName, "image/png");
    }

    public String uploadImage(MultipartFile file, String fileName){
        try {
            validateFile(file);
            return storagePort.uploadFile(file.getBytes(), fileName, file.getContentType());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (!file.getContentType().equals("image/png") && !file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/jpg")){
            throw new FormatInvalidException();
        }
    }

}
