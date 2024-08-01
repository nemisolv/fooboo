package com.facebook.payload;


import lombok.*;

@Builder
@AllArgsConstructor @NoArgsConstructor
@Getter
@Setter

public class ResponseObject {
    private int code;
    private String message;
    private Object data;
}
