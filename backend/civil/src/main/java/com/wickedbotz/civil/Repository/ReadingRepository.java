package com.wickedbotz.civil.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wickedbotz.civil.Model.Reading;

@Repository
public interface ReadingRepository extends JpaRepository<Reading, Integer> {
}
