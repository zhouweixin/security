package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Wage;
import com.xplusplus.security.domain.Wage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:23 2018/6/12
 * @Modified By:
 */
@Repository
public interface WageRepository extends JpaRepository<Wage, Integer> {
    /**
     * 通过名称模糊查询-分页
     * @param name
     * @param pageable
     * @return
     */
    public Page<Wage> findByNameLike(String name, Pageable pageable);
}
