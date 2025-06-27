package com.nexus.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String productName) {
        super(productName);
    }
}
