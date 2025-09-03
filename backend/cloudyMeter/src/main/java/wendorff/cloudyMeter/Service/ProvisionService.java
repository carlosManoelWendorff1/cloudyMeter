package wendorff.cloudyMeter.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Enum.MeterStatus;
import wendorff.cloudyMeter.Model.Meter;
import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Model.Sensor;

@Service
public class ProvisionService {

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private MeterService meterService;

    @Autowired
    private SensorService sensorService;

    public Meter provisionMeter(String mac, Integer orgId, String meterName) {
        if (mac == null || mac.isBlank()) {
            throw new IllegalArgumentException("MAC não pode ser vazio.");
        }
        if (meterName == null || meterName.isBlank()) {
            throw new IllegalArgumentException("Nome do medidor não pode ser vazio.");
        }
        Organization organization = organizationService.findById(orgId).orElse(null);
        if (organization == null) {
            throw new IllegalArgumentException("Organização não encontrada para o ID informado.");
        }

        if (meterService.findById(mac).isPresent()) {
            throw new IllegalArgumentException("Já existe um medidor com esse MAC.");
        }

        Meter meter = new Meter();
        meter.setId(mac);
        meter.setName(meterName);
        meter.setBattery(null);
        meter.setOrganization(organization);
        meter.setStatus(MeterStatus.PROVISIONED);

        try {
            meter = meterService.save(meter);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar o medidor: " + e.getMessage());
        }

        List<Sensor> sensors = List.of(
            new Sensor(true, meter.getName() + "-sensorBase", "Umidade", "%", meter.getId() + "-sensorBaseUmidade", meter),
            new Sensor(true, meter.getName() + "-sensorBase", "Temperatura", "Cº", meter.getId() + "-sensorBaseTemperatura", meter),
            new Sensor(false, meter.getName() + "-sensor1", "Temperatura", "Cº", meter.getId() + "-sensor1", meter),
            new Sensor(false, meter.getName() + "-sensor2", "Temperatura", "Cº", meter.getId() + "-sensor2", meter),
            new Sensor(false, meter.getName() + "-sensor3", "Temperatura", "Cº", meter.getId() + "-sensor3", meter)
        );

        for (Sensor sensor : sensors) {
            try {
                sensorService.save(sensor);
            } catch (Exception e) {
                // Opcional: logar erro ou lançar exceção
                System.err.println("Erro ao salvar sensor: " + sensor.getName() + " - " + e.getMessage());
            }
        }

        return meter;
    }
}