package com.facebook.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
@Setter
@AllArgsConstructor
public class ResourceNotFoundException extends Exception {
    private String resourceName;
    private String fieldName;
    private String fieldValue;

 public ResourceNotFoundException(String message) {
     super(message);
 }
}
