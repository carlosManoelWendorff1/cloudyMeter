package wendorff.cloudyMeter.Dto;

import java.util.List;

public class OrganizationDTO {
    private Integer id;
    private String name;
    private List<Integer> meterIds;

    // Getters e setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Integer> getMeterIds() { return meterIds; }
    public void setMeterIds(List<Integer> meterIds) { this.meterIds = meterIds; }
}