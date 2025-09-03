package wendorff.cloudyMeter.Config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import wendorff.cloudyMeter.Model.Alert;
import wendorff.cloudyMeter.Model.Meter;
import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Model.Reading;
import wendorff.cloudyMeter.Model.Sensor;
import wendorff.cloudyMeter.Repository.AlertRepository;
import wendorff.cloudyMeter.Repository.MeterRepository;
import wendorff.cloudyMeter.Repository.OrganizationRepository;
import wendorff.cloudyMeter.Repository.ReadingRepository;
import wendorff.cloudyMeter.Repository.SensorRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            OrganizationRepository orgRepo,
            MeterRepository meterRepo,
            SensorRepository sensorRepo,
            ReadingRepository readingRepo,
            AlertRepository alertRepo
    ) {
        return args -> {
            if (orgRepo.count() == 0) {
                // Criar Organização
                Organization org = new Organization();
                org.setName("OrgTeste");
                org.setPasswordHash("123456"); // Em produção: usar BCrypt
                org.setChatId("12312312312312L");
                orgRepo.save(org);

                // Criar Meter
                Meter meter = new Meter();
                meter.setId("00:1A:7D:DA:71:13");
                meter.setBattery(95);
                meter.setOrganization(org);
                meterRepo.save(meter);

                // Criar Sensor
                Sensor tempSensor = new Sensor();
                tempSensor.setId(meter.getId() + "-sensor1");
                tempSensor.setIsDefault(true);
                tempSensor.setName("TempSensor1");
                tempSensor.setType("TEMPERATURE");
                tempSensor.setUnit("°C");
                tempSensor.setMeter(meter);
                sensorRepo.save(tempSensor);

                // Criar Leitura
                Reading reading = new Reading();
                reading.setSensor(tempSensor);
                reading.setTime(LocalDateTime.now());
                reading.setValue(25.5f);
                readingRepo.save(reading);

                // Criar Alerta
                Alert alert = new Alert();
                alert.setMessage("Temperatura alta detectada!");
                alert.setSensor(tempSensor);
                alertRepo.save(alert);

                System.out.println("Mock data inserido com sucesso ✅");
            }
        };
    }
}
