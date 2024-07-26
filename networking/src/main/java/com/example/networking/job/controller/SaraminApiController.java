package com.example.networking.job.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.networking.job.service.SaraminApiService;

@RestController
@RequestMapping("/api/external")
public class SaraminApiController {

    @Autowired
    private SaraminApiService saraminApiService;

    @SuppressWarnings("deprecation")
    @GetMapping(value = "/data", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> getExternalData() {
        String data = saraminApiService.getExternalData();
        return ResponseEntity.ok().body(data);
    }
}