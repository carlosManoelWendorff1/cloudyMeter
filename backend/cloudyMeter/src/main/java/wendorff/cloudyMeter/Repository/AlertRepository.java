package wendorff.cloudyMeter.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Alert;
import wendorff.cloudyMeter.Model.Organization;


@Repository
public interface AlertRepository extends JpaRepository<Alert, Integer> {
        List<Alert> findBySensorId(String sensorId);
        List<Alert> findBySensorMeterOrganization(Organization organization);
}
