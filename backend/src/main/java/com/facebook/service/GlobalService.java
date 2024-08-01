package com.facebook.service;

import com.facebook.payload.GlobalSearchParams;
import com.facebook.payload.GlobalSearchResponse;
import com.facebook.payload.PagedResponse;

import java.util.List;

public interface GlobalService {
    PagedResponse<GlobalSearchResponse> globalSearch(GlobalSearchParams params);
}
