package com.facebook.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder

@AllArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GlobalSearchResponse {
    private Long id;
    private String title;
    private String type;
    private Object data;

    public GlobalSearchResponse(Long id, String title, String type) {
        this.id = id;
        this.title = title;
        this.type = type;
    }


}