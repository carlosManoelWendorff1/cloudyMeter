package wendorff.cloudyMeter.Model;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Boolean isDefault;
    private String name;
    private String type; // TEMPERATURE, HUMIDITY, PRESSURE, GENERIC
    private String unit;

    @ManyToOne
    @JoinColumn(name = "meter_id")
    private Meter meter;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL)
    private List<Reading> readings;

}
