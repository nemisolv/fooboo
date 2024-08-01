package com.facebook.exception;

public class ResourceInUseException extends Exception {
    private String message;

    public ResourceInUseException(String message) {
        super(message);
    }
}
