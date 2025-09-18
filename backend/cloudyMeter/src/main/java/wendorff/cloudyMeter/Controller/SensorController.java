package wendorff.cloudyMeter.Controller;

import org.springframework.web.bind.annotation.*;

import wendorff.cloudyMeter.Dto.TresholdDTO;
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
    public Sensor getById(@PathVariable String id) {
        return service.findById(id).orElse(null);
    }

    @GetMapping("/meter/{id}")
    public List<Sensor> getByMeterId(@PathVariable String id) {
        return service.findByMeterId(id);
    }

    @PostMapping
    public Sensor create(@RequestBody Sensor sensor) {
        return service.save(sensor);
    }

    @PutMapping("/{id}")
    public Sensor update(@PathVariable String id, @RequestBody Sensor sensor) {
        sensor.setId(id);
        return service.save(sensor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @PostMapping("/{id}/thresholds")
    public Sensor setThresholds(
            @PathVariable String id,
            @RequestBody TresholdDTO thresholdData) {

        return service.setThresholds(
                id,
                thresholdData);
    }

    // Novo endpoint para obter informações de thresholds
    @GetMapping("/{id}/thresholds")
    public TresholdDTO getThresholds(@PathVariable String id) {
        Sensor sensor = service.findById(id).orElse(null);
        if (sensor == null) {
            return null;
        }
        return new TresholdDTO(
                sensor.getMinThreshold(),
                sensor.getMaxThreshold(),
                sensor.getThresholdEnabled());
    }
}
