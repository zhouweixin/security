package com.xplusplus.security.repository;

import com.xplusplus.security.domain.AttendanceAddress;
import com.xplusplus.security.domain.AttendanceGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author：XudongHu
 * @description: 不解释
 * @date:20:29 2018/6/1
 */
public interface AttendanceAddressRepository  extends JpaRepository<AttendanceAddress,Integer> {
    public List<AttendanceAddress> findByAttendanceGroup(AttendanceGroup attendanceGroup);
}
