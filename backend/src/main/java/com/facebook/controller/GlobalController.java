package com.facebook.controller;

import com.facebook.payload.GlobalSearchParams;
import com.facebook.service.GlobalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${app.api_prefix}/global")
@RequiredArgsConstructor
public class GlobalController {
    private final GlobalService globalService;

    @GetMapping("/search/top")
    public ResponseEntity<?> globalSearch(@RequestParam("q") String keySearch, @RequestParam(value = "type", defaultValue = "user") String type,
                                          @RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                                          @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                                          @RequestParam(value = "sortOrder", defaultValue = "asc") String sortOrder,
                                          @RequestParam(value = "sortBy", defaultValue = "createdAt") String sortBy) {
        GlobalSearchParams params = new GlobalSearchParams(keySearch, type, pageNo, pageSize, sortBy,sortOrder);
        return ResponseEntity.ok(globalService.globalSearch(params));
    }
}
