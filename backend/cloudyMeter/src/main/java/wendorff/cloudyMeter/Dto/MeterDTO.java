package wendorff.cloudyMeter.Dto;

import java.util.List;

public class MeterDTO {
    private Integer id;
    private Integer battery;
    private Integer organizationId;
    private List<Integer> sensorIds;

    // Getters e setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getBattery() { return battery; }
    public void setBattery(Integer battery) { this.battery = battery; }

    public Integer getOrganizationId() { return organizationId; }
    public void setOrganizationId(Integer organizationId) { this.organizationId = organizationId; }

    public List<Integer> getSensorIds() { return sensorIds; }
    public void setSensorIds(List<Integer> sensorIds) { this.sensorIds = sensorIds; }
}