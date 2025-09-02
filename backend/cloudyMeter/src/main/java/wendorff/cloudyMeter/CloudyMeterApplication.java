package wendorff.cloudyMeter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CloudyMeterApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudyMeterApplication.class, args);
    }

}