package com.wickedbotz.civil.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wickedbotz.civil.Model.Meter;
import com.wickedbotz.civil.Services.MeterService;

@RestController
@RequestMapping("/meters")
public class MeterController {

    @Autowired
    private MeterService meterService;

    @PostMapping
    public ResponseEntity<?> createMeter(@RequestBody Meter meter) {
        Meter createdMeter = meterService.createMeter(meter);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMeter);
    }

    @GetMapping
    public ResponseEntity<?> getMeters() {
        return ResponseEntity.ok(meterService.getAllMeters());
    }

    @GetMapping("/{meterId}")
    public ResponseEntity<?> getMeter(@PathVariable int meterId) {
        Meter meter = meterService.getMeterById(meterId);
        if (meter != null) {
            return ResponseEntity.ok(meter);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{meterId}")
    public ResponseEntity<?> updateMeter(@PathVariable int meterId, @RequestBody Meter meter) {
        Meter updatedMeter = meterService.updateMeter(meterId, meter);
        if (updatedMeter != null) {
            return ResponseEntity.ok(updatedMeter);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{meterId}")
    public ResponseEntity<?> deleteMeter(@PathVariable int meterId) {
        boolean deleted = meterService.deleteMeter(meterId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
