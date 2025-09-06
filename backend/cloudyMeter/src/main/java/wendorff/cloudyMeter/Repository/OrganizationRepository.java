package wendorff.cloudyMeter.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Organization;


@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Integer> {
    Organization findByChatId(String chatId);
    Optional<Organization> findByName(String name);
}

