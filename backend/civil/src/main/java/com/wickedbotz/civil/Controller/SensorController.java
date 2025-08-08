package com.wickedbotz.civil.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wickedbotz.civil.Model.Sensor;
import com.wickedbotz.civil.Services.SensorService;

@RestController
@RequestMapping("/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @PostMapping
    public ResponseEntity<?> createSensor(@RequestBody Sensor sensor) {
        Sensor createdSensor = sensorService.createSensor(sensor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSensor);
    }

    @GetMapping
    public ResponseEntity<?> getSensors() {
        return ResponseEntity.ok(sensorService.getAllSensors());
    }

    @GetMapping("/{sensorId}")
    public ResponseEntity<?> getSensor(@PathVariable int sensorId) {
        Sensor sensor = sensorService.getSensorById(sensorId);
        if (sensor != null) {
            return ResponseEntity.ok(sensor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{sensorId}")
    public ResponseEntity<?> updateSensor(@PathVariable int sensorId, @RequestBody Sensor sensor) {
        Sensor updatedSensor = sensorService.updateSensor(sensorId, sensor);
        if (updatedSensor != null) {
            return ResponseEntity.ok(updatedSensor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{sensorId}")
    public ResponseEntity<?> deleteSensor(@PathVariable int sensorId) {
        boolean deleted = sensorService.deleteSensor(sensorId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
