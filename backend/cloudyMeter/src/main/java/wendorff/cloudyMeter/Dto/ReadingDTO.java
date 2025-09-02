package wendorff.cloudyMeter.Dto;

import java.time.LocalDateTime;

public class ReadingDTO {
    private Integer id;
    private Float value;
    private LocalDateTime time;
    private Integer sensorId;

    // Getters e setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Float getValue() { return value; }
    public void setValue(Float value) { this.value = value; }

    public LocalDateTime getTime() { return time; }
    public void setTime(LocalDateTime time) { this.time = time; }

    public Integer getSensorId() { return sensorId; }
    public void setSensorId(Integer sensorId) { this.sensorId = sensorId; }
}