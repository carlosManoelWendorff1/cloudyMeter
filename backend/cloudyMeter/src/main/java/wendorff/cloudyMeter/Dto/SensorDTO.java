package wendorff.cloudyMeter.Dto;

import java.util.List;

public class SensorDTO {
    private Integer id;
    private Boolean isDefault;
    private String name;
    private String type;
    private String unit;
    private Integer meterId;
    private List<Integer> readingIds;
    private List<Integer> alertIds;

    // Getters e setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Boolean getIsDefault() { return isDefault; }
    public void setIsDefault(Boolean isDefault) { this.isDefault = isDefault; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Integer getMeterId() { return meterId; }
    public void setMeterId(Integer meterId) { this.meterId = meterId; }

    public List<Integer> getReadingIds() { return readingIds; }
    public void setReadingIds(List<Integer> readingIds) { this.readingIds = readingIds; }

    public List<Integer> getAlertIds() { return alertIds; }
    public void setAlertIds(List<Integer> alertIds) { this.alertIds = alertIds; }
}