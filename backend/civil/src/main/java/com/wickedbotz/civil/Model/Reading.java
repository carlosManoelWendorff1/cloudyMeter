package com.wickedbotz.civil.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "reading")
public class Reading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private float value;
    private LocalDateTime time;
    private String type;

    @ManyToOne
    private Sensor sensor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensorId(Sensor sensor) {
        this.sensor = sensor;
    }
}
