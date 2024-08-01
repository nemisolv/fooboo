package com.facebook.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GlobalSearchParams {
    private String keySearch;
    private String type;
    private int pageNo;
    private int pageSize;
    private String sortBy;
    private String sortOrder;
}