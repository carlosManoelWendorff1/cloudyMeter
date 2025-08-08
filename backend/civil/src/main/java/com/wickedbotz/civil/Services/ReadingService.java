package com.wickedbotz.civil.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wickedbotz.civil.Model.Reading;
import com.wickedbotz.civil.Repository.ReadingRepository;

import java.util.List;

@Service
public class ReadingService {

    @Autowired
    private ReadingRepository readingRepository;

    public Reading createReading(Reading reading) {
        return readingRepository.save(reading);
    }

    public List<Reading> getAllReadings() {
        return readingRepository.findAll();
    }

    public Reading getReadingById(int readingId) {
        return readingRepository.findById(readingId).orElse(null);
    }

    // Implement other CRUD operations for Reading service as needed
}
