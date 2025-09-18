package wendorff.cloudyMeter.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Dto.AlertDTO;
import wendorff.cloudyMeter.Dto.ReadingDTO;
import wendorff.cloudyMeter.Model.Alert;
import wendorff.cloudyMeter.Model.Reading;
import wendorff.cloudyMeter.Model.Sensor;
import wendorff.cloudyMeter.Repository.ReadingRepository;

@Service
public class ReadingService {

    @Autowired
    AlertService alertService;

    @Autowired
    SensorService sensorService;

    private final ReadingRepository repository;

    public ReadingService(ReadingRepository repository) {
        this.repository = repository;
    }

    public List<Reading> findAll() {
        return repository.findAll();
    }

    public Optional<Reading> findById(Integer id) {
        return repository.findById(id);
    }

    public List<Reading> findBySensorId(String id) {
        return repository.findBySensorId(id);
    }

    public Reading save(ReadingDTO readingDTO) {
        Sensor sensor = sensorService.findById(readingDTO.getSensorId()).orElse(null);
        if (sensor == null) {
            throw new IllegalArgumentException("Sensor not found");
        }
        if (sensor.getThresholdEnabled() != null && sensor.getThresholdEnabled()) {
            if (readingDTO.getValue() < sensor.getMinThreshold()
                    || readingDTO.getValue() > sensor.getMaxThreshold()) {
                alertService.createAlert(
                        new AlertDTO(sensor.getId(),
                                readingDTO.getValue() < sensor.getMinThreshold()
                                        ? "Valor Mínimo Não Atingido, esperado " + sensor.getMinThreshold()
                                                + " mas foi "
                                                + readingDTO.getValue()
                                        : "Valor Máximo ultrapassado, esperado " + sensor.getMaxThreshold()
                                                + " mas foi "
                                                + readingDTO.getValue()));
            }
        }
        Reading reading = new Reading(readingDTO.getValue(), readingDTO.getTime(), sensor);
        return repository.save(reading);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
