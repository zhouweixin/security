package com.xplusplus.security.repository;

import com.xplusplus.security.domain.AttendanceAddress;
import com.xplusplus.security.domain.AttendanceGroup;
import com.xplusplus.security.domain.Nation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author：XudongHu
 * @description: 不解释
 * @date:20:29 2018/6/1
 */
public interface AttendanceAddressRepository  extends JpaRepository<AttendanceAddress, Long> {
    /**
     * 通过名称模糊查询-分页
     * @param name
     * @param pageable
     * @return
     */
    public Page<AttendanceAddress> findByNameLike(String name, Pageable pageable);
}
