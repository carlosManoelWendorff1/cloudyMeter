package com.wickedbotz.civil.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wickedbotz.civil.Model.Meter;

@Repository
public interface MeterRepository extends JpaRepository<Meter, Integer> {
}

