package wendorff.cloudyMeter.Dto;

import java.time.LocalDateTime;

public class AlertDTO {
    private Integer id;
    private String message;
    private String sensorId;
    private LocalDateTime time;

    public AlertDTO(String sensorId, String message) {
        this.sensorId = sensorId;
        this.message = message;
        this.time = LocalDateTime.now();
    }

    // Getters e setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }
}