package wendorff.cloudyMeter.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Reading;


@Repository
public interface ReadingRepository extends JpaRepository<Reading, Integer> {
        List<Reading> findBySensorId(String sensorId);

}
