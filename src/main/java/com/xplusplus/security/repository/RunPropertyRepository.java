package com.xplusplus.security.repository;

import com.xplusplus.security.domain.RunProperty;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 8:36 2018/7/13
 * @Modified By:
 */
public interface RunPropertyRepository extends JpaRepository<RunProperty, Long> {
    /**
     * 查询最新的记录
     *
     * @return
     */
    public RunProperty findFirstByOrderByDateDesc();

    /**
     * 批量删除
     *
     * @param ids
     */
    public void deleteByIdIn(Collection<Long> ids);
}
