package wendorff.cloudyMeter.Model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Sensor {

    @Id
    private String id;

    private Boolean isDefault;
    private String name;
    private String type; // TEMPERATURE, HUMIDITY, PRESSURE, GENERIC
    private String unit;

    @ManyToOne
    @JoinColumn(name = "meter_id")
    @JsonBackReference // evita loop quando serializando a organização
    private Meter meter;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL)
    @JsonManagedReference 
    private List<Reading> readings;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL)
    @JsonManagedReference 
    private List<Alert> alerts;

    public Sensor() {
    }
    public Sensor(Boolean isDefault, String name, String type, String unit,String id, Meter meter) {
        this.isDefault = isDefault;
        this.name = name;
        this.type = type;
        this.unit = unit;
        this.id = id;
        this.meter = meter;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Meter getMeter() {
        return meter;
    }

    public void setMeter(Meter meter) {
        this.meter = meter;
    }

    public List<Reading> getReadings() {
        return readings;
    }

    public void setReadings(List<Reading> readings) {
        this.readings = readings;
    }

    public List<Alert> getAlerts() {
        return alerts;
    }

    public void setAlerts(List<Alert> alerts) {
        this.alerts = alerts;
    }
    

}

