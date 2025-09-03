package wendorff.cloudyMeter.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Model.Reading;
import wendorff.cloudyMeter.Repository.ReadingRepository;

@Service
public class ReadingService {
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

    public Reading save(Reading reading) {
        return repository.save(reading);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
