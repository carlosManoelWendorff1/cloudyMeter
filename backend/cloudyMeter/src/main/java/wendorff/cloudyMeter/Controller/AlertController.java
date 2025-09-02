package wendorff.cloudyMeter.Controller;

import org.springframework.web.bind.annotation.*;

import wendorff.cloudyMeter.Dto.AlertDTO;
import wendorff.cloudyMeter.Model.Alert;
import wendorff.cloudyMeter.Service.AlertService;


@RestController
@RequestMapping("/alerts")
public class AlertController {
    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }


    @PostMapping
    public Alert create(@RequestBody AlertDTO alert) {
        return alertService.createAlert(alert);
    }

}
