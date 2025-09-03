package wendorff.cloudyMeter.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Meter;


@Repository
public interface MeterRepository extends JpaRepository<Meter, String> {
    List<Meter> findByOrganizationId(Integer organizationId);

}

