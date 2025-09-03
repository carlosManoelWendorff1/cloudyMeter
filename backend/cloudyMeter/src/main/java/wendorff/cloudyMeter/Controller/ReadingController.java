package wendorff.cloudyMeter.Controller;

import org.springframework.web.bind.annotation.*;
import wendorff.cloudyMeter.Model.Reading;
import wendorff.cloudyMeter.Service.ReadingService;

import java.util.List;

@RestController
@RequestMapping("/readings")
public class ReadingController {
    private final ReadingService service;

    public ReadingController(ReadingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Reading> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Reading getById(@PathVariable Integer id) {
        return service.findById(id).orElse(null);
    }
    @GetMapping("/sensor/{id}")
    public List<Reading> getBySensorId(@PathVariable String id) {
        return service.findBySensorId(id);
    }

    @PostMapping
    public Reading create(@RequestBody Reading reading) {
        return service.save(reading);
    }

    @PutMapping("/{id}")
    public Reading update(@PathVariable Integer id, @RequestBody Reading reading) {
        reading.setId(id);
        return service.save(reading);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
