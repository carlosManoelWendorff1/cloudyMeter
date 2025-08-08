package com.wickedbotz.civil.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wickedbotz.civil.Model.Reading;
import com.wickedbotz.civil.Services.ReadingService;

@RestController
@RequestMapping("/readings")
public class ReadingController {

    @Autowired
    private ReadingService readingService;

    @PostMapping
    public ResponseEntity<?> createReading(@RequestBody Reading reading) {
        Reading createdReading = readingService.createReading(reading);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReading);
    }

    @GetMapping
    public ResponseEntity<?> getReadings() {
        return ResponseEntity.ok(readingService.getAllReadings());
    }

    @GetMapping("/{readingId}")
    public ResponseEntity<?> getReading(@PathVariable int readingId) {
        Reading reading = readingService.getReadingById(readingId);
        if (reading != null) {
            return ResponseEntity.ok(reading);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Implement other CRUD operations for Reading as needed
}
