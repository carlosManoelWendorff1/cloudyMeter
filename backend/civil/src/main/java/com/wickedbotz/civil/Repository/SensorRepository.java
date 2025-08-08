package com.wickedbotz.civil.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wickedbotz.civil.Model.Sensor;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Integer> {
}
