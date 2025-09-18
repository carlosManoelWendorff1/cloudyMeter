package wendorff.cloudyMeter.Dto;

public class TresholdDTO {
    private Double minThreshold;
    private Double maxThreshold;
    private Boolean thresholdEnabled;

    public TresholdDTO(Double minThreshold, Double maxThreshold, Boolean thresholdEnabled) {
        this.minThreshold = minThreshold;
        this.maxThreshold = maxThreshold;
        this.thresholdEnabled = thresholdEnabled;
    }

    public Double getMinThreshold() {
        return minThreshold;
    }

    public void setMinThreshold(Double minThreshold) {
        this.minThreshold = minThreshold;
    }

    public Double getMaxThreshold() {
        return maxThreshold;
    }

    public void setMaxThreshold(Double maxThreshold) {
        this.maxThreshold = maxThreshold;
    }

    public Boolean getThresholdEnabled() {
        return thresholdEnabled;
    }

    public void setThresholdEnabled(Boolean thresholdEnabled) {
        this.thresholdEnabled = thresholdEnabled;
    }
}
