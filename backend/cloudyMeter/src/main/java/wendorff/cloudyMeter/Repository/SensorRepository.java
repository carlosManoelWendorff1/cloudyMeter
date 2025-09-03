package wendorff.cloudyMeter.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Sensor;


@Repository
public interface SensorRepository extends JpaRepository<Sensor, String> {
        List<Sensor> findByMeterId(String meterId);

}
