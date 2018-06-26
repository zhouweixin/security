package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Schedule;
import com.xplusplus.security.domain.ScheduleLateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleLateTypeRepository extends JpaRepository<ScheduleLateType,Integer> {
    public List<ScheduleLateType> findBySchedule(Schedule schedule);
}
