package wendorff.cloudyMeter.Controller;

import org.springframework.web.bind.annotation.*;
import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Service.OrganizationService;

import java.util.List;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {
    private final OrganizationService service;

    public OrganizationController(OrganizationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Organization> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Organization getById(@PathVariable Integer id) {
        return service.findById(id).orElse(null);
    }

    @PostMapping
    public Organization create(@RequestBody Organization org) {
        return service.save(org);
    }

    @PutMapping("/{id}")
    public Organization update(@PathVariable Integer id, @RequestBody Organization org) {
        org.setId(id);
        return service.save(org);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
