package wendorff.cloudyMeter.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Dto.TresholdDTO;
import wendorff.cloudyMeter.Model.Sensor;
import wendorff.cloudyMeter.Repository.SensorRepository;

@Service
public class SensorService {
    private final SensorRepository repository;

    public SensorService(SensorRepository repository) {
        this.repository = repository;
    }

    public List<Sensor> findAll() {
        return repository.findAll();
    }

    public Optional<Sensor> findById(String id) {
        return repository.findById(id);
    }

    public List<Sensor> findByMeterId(String id) {
        return repository.findByMeterId(id);
    }

    public Sensor save(Sensor sensor) {
        return repository.save(sensor);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public Sensor setThresholds(String id, TresholdDTO thresholdData) {
        Optional<Sensor> optionalSensor = repository.findById(id);
        if (optionalSensor.isPresent()) {
            Sensor sensor = optionalSensor.get();
            sensor.setMinThreshold(thresholdData.getMinThreshold());
            sensor.setMaxThreshold(thresholdData.getMaxThreshold());
            sensor.setThresholdEnabled(thresholdData.getThresholdEnabled());
            return repository.save(sensor);
        } else {
            throw new RuntimeException("Sensor not found with id: " + id);
        }
    }
}
