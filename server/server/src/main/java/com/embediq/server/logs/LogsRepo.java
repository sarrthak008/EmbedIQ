package com.embediq.server.logs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface LogsRepo extends JpaRepository<LogsEntity , String> {
    List<LogsEntity> findTop5ByOrderByCreatedAtDesc();

    long countByCreatedAtAfter(LocalDateTime timestamp);

    long countByOperation(String operation);

    // Gets the total size of your database in Bytes across all nodes
    @Query(value = "SELECT SUM(data_length + index_length) " +
            "FROM information_schema.TABLES " +
            "WHERE table_schema = DATABASE()", nativeQuery = true)
    Long getTiDBTotalSize();

    // Gets the number of healthy vs unhealthy regions (Advanced Health KPI)
    @Query(value = "SELECT COUNT(*) FROM information_schema.TIKV_REGION_STATUS WHERE WRITABLE = 'No'", nativeQuery = true)
    Long getUnhealthyRegions();
}
