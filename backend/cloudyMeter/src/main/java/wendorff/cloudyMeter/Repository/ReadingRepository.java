package wendorff.cloudyMeter.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Reading;


@Repository
public interface ReadingRepository extends JpaRepository<Reading, Integer> {
}
