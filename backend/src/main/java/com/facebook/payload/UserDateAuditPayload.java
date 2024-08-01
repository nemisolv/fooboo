package com.facebook.payload;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDateAuditPayload extends DateAuditPayload{
    private String createdBy;
    private String updatedBy;
}
