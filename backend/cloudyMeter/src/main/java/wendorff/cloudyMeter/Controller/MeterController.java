package wendorff.cloudyMeter.Controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import wendorff.cloudyMeter.Model.Meter;
import wendorff.cloudyMeter.Service.MeterService;

import java.util.List;

@RestController
@RequestMapping("/meters")
public class MeterController {
    private final MeterService service;

    public MeterController(MeterService service) {
        this.service = service;
    }

    @GetMapping
    public List<Meter> getAll() {
        return service.findAll();
    }
    @GetMapping("/list")
    public List<Meter> getAllByOrganizationToken(Authentication authentication) {
        String orgName = authentication.getName(); // vem do subject do token
        return service.findAllByOrganizationName(orgName);
    }
    @GetMapping("/organization/{id}")
    public List<Meter> getAllByOrganization(@PathVariable Integer id) {
        return service.findAllByOrganization(id);
    }

    @GetMapping("/{id}")
    public Meter getById(@PathVariable String id) {
        return service.findById(id).orElse(null);
    }

    @PostMapping
    public Meter create(@RequestBody Meter meter) {
        return service.save(meter);
    }

    @PutMapping("/{id}")
    public Meter update(@PathVariable String id, @RequestBody Meter meter) {
        meter.setId(id);
        return service.save(meter);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
