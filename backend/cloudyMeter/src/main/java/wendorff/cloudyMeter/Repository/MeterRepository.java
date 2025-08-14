package wendorff.cloudyMeter.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Meter;


@Repository
public interface MeterRepository extends JpaRepository<Meter, Integer> {
}

