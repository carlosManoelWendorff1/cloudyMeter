package wendorff.cloudyMeter.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Model.Meter;
import wendorff.cloudyMeter.Repository.MeterRepository;

@Service
public class MeterService {
    private final MeterRepository repository;

    public MeterService(MeterRepository repository) {
        this.repository = repository;
      }

    public List<Meter> findAll() {
        return repository.findAll();
    }
     public List<Meter> findAllByOrganization(Integer orgId) {
        return repository.findByOrganizationId(orgId);
    }

    public Optional<Meter> findById(String id) {
        return repository.findById(id);
    }

    public Meter save(Meter meter) {
        return repository.save(meter);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
