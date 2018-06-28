package com.xplusplus.security.repository;

import com.xplusplus.security.domain.AttendanceGroup;
import com.xplusplus.security.domain.AttendanceGroupAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 16:18 2018/6/28
 * @Modified By:
 */
@Repository
public interface AttendanceGroupAddressRepository extends JpaRepository<AttendanceGroupAddress, Long> {
    /**
     * 通过考勤组查询考勤组与地址对应关系
     *
     * @param attendanceGroup
     * @return
     */
    public List<AttendanceGroupAddress> findByAttendanceGroup(AttendanceGroup attendanceGroup);

    /**
     * 通过考勤组删除对应关系
     *
     * @param attendanceGroup
     */
    public void deleteByAttendanceGroup(AttendanceGroup attendanceGroup);
}
