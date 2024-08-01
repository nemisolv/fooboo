package com.facebook.exception;



public class ResourceIsDeletedException extends RuntimeException {
    public ResourceIsDeletedException(String message) {
        super(message);
    }
}
