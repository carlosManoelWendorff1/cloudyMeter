package wendorff.cloudyMeter.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Enum.MeterStatus;
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

    public List<Meter> findAllByOrganizationName(String orgName) {
        List<Meter> meters = repository.findByOrganizationName(orgName);
        LocalDateTime now = LocalDateTime.now();

        for (Meter meter : meters) {
            boolean hasRecentReading = meter.getSensors().stream()
                    .flatMap(sensor -> sensor.getReadings().stream())
                    .anyMatch(reading -> reading.getTime().isAfter(now.minusMinutes(30)));

            if (!hasRecentReading) {
                meter.setStatus(MeterStatus.INACTIVE);
                repository.save(meter);
            } else if (meter.getStatus() == MeterStatus.INACTIVE) {
                meter.setStatus(MeterStatus.ACTIVE);
                repository.save(meter);
            }
        }

        return meters;
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
