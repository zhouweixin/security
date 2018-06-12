package com.xplusplus.security.repository;

import com.xplusplus.security.domain.ResignType;
import com.xplusplus.security.domain.ResignType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 17:19 2018/6/12
 * @Modified By:
 */
public interface ResignTypeRepository extends JpaRepository<ResignType, Integer> {
    /**
     * 通过名称模糊查询-分页
     * @param name
     * @param pageable
     * @return
     */
    public Page<ResignType> findByNameLike(String name, Pageable pageable);
}
