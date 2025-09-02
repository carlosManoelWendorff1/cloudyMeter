package wendorff.cloudyMeter.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Repository.OrganizationRepository;

@Service
public class OrganizationService {
    private final OrganizationRepository repository;

    public OrganizationService(OrganizationRepository repository) {
        this.repository = repository;
    }

    public List<Organization> findAll() {
        return repository.findAll();
    }

    public Optional<Organization> findById(Integer id) {
        return repository.findById(id);
    }

    public Organization save(Organization org) {
        return repository.save(org);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Organization findByTelephone(String telefone) {
        return repository.findByTelephone(telefone);
    }

}
