package com.nexus.dto.Inventory;

public enum StockStatus {

    OK("Stock OK"),
    LOW("Low Stock"),
    OUT_OF_STOCK("Out of Stock");

    private final String description;

    StockStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
