package wendorff.cloudyMeter.Controller;

import org.springframework.web.bind.annotation.*;
import wendorff.cloudyMeter.Model.Sensor;
import wendorff.cloudyMeter.Service.SensorService;

import java.util.List;

@RestController
@RequestMapping("/sensors")
public class SensorController {
    private final SensorService service;

    public SensorController(SensorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sensor> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Sensor getById(@PathVariable Integer id) {
        return service.findById(id).orElse(null);
    }

     @GetMapping("/meter/{id}")
    public List<Sensor> getByMeterId(@PathVariable Integer id) {
        return service.findByMeterId(id);
    }

    @PostMapping
    public Sensor create(@RequestBody Sensor sensor) {
        return service.save(sensor);
    }

    @PutMapping("/{id}")
    public Sensor update(@PathVariable Integer id, @RequestBody Sensor sensor) {
        sensor.setId(id);
        return service.save(sensor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
