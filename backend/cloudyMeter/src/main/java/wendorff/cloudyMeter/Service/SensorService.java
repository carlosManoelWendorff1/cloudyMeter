package wendorff.cloudyMeter.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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

    public Optional<Sensor> findById(Integer id) {
        return repository.findById(id);
    }

    public Sensor save(Sensor sensor) {
        return repository.save(sensor);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
