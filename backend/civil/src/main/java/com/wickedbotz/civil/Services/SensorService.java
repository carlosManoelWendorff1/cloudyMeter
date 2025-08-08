package com.wickedbotz.civil.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wickedbotz.civil.Model.Sensor;
import com.wickedbotz.civil.Repository.SensorRepository;

import java.util.List;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public Sensor createSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public Sensor getSensorById(int sensorId) {
        return sensorRepository.findById(sensorId).orElse(null);
    }

    public Sensor updateSensor(int sensorId, Sensor sensor) {
        Sensor existingSensor = getSensorById(sensorId);
        if (existingSensor != null) {
            existingSensor.setDefault(sensor.getIsDefault());
            existingSensor.setMeterId(sensor.getMeter());
            return sensorRepository.save(existingSensor);
        }
        return null;
    }

    public boolean deleteSensor(int sensorId) {
        Sensor existingSensor = getSensorById(sensorId);
        if (existingSensor != null) {
            sensorRepository.delete(existingSensor);
            return true;
        }
        return false;
    }
}
