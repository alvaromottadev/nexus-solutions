package com.nexus.service;

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
            return storagePort.uploadFile(file.getBytes(), fileName, file.getContentType());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }

}
