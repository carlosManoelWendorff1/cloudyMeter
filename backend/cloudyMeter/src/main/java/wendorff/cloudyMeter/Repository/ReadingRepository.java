package wendorff.cloudyMeter.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import wendorff.cloudyMeter.Model.Reading;

@Repository
public interface ReadingRepository extends JpaRepository<Reading, Integer> {
        List<Reading> findBySensorIdOrderByTimeDesc(String sensorId);

        @Query(value = """
                        WITH diffs AS (
                            SELECT
                                r.*,
                                CASE
                                    WHEN LAG(r.time) OVER (PARTITION BY r.sensor_id ORDER BY r.time DESC) IS NULL
                                         OR EXTRACT(EPOCH FROM (LAG(r.time) OVER (PARTITION BY r.sensor_id ORDER BY r.time DESC) - r.time)) / 60 > 10
                                    THEN 1
                                    ELSE 0
                                END AS new_block
                            FROM reading r
                            WHERE r.sensor_id = :sensorId
                        ),
                        blocks AS (
                            SELECT *,
                                   SUM(new_block) OVER (ORDER BY time DESC ROWS UNBOUNDED PRECEDING) AS block_id
                            FROM diffs
                        )
                        SELECT *
                        FROM blocks
                        WHERE block_id = 1
                        ORDER BY time DESC
                        """, nativeQuery = true)
        List<Reading> findLatestContinuousBlock(@Param("sensorId") String sensorId);

}
