package com.wickedbotz.civil.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wickedbotz.civil.Model.Meter;
import com.wickedbotz.civil.Repository.MeterRepository;

import java.util.List;

@Service
public class MeterService {

    @Autowired
    private MeterRepository meterRepository;

    public Meter createMeter(Meter meter) {
        return meterRepository.save(meter);
    }

    public List<Meter> getAllMeters() {
        return meterRepository.findAll();
    }

    public Meter getMeterById(int meterId) {
        return meterRepository.findById(meterId).orElse(null);
    }

    public Meter updateMeter(int meterId, Meter meter) {
        Meter existingMeter = getMeterById(meterId);
        if (existingMeter != null) {
            existingMeter.setBattery(meter.getBattery());
            return meterRepository.save(existingMeter);
        }
        return null;
    }

    public boolean deleteMeter(int meterId) {
        Meter existingMeter = getMeterById(meterId);
        if (existingMeter != null) {
            meterRepository.delete(existingMeter);
            return true;
        }
        return false;
    }
}
