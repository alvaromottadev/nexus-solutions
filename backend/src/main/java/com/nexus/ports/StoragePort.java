package com.nexus.ports;

public interface StoragePort {

    String uploadFile(byte[] file, String fileName, String contentType);

}
