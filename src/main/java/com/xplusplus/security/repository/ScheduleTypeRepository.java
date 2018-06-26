package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Schedule;
import com.xplusplus.security.domain.ScheduleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleTypeRepository extends JpaRepository<ScheduleType,Integer> {

    /**
     * 通过名称模糊查询-分页
     */
    public Page<ScheduleType> findByNameLike(String name, Pageable pageable);

    public List<ScheduleType> findBySchedule(Schedule schedule);
}
