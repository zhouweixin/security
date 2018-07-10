package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Material;
import com.xplusplus.security.domain.Nation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    /**
     * 通过名称模糊查询-分页
     * @param name
     * @param pageable
     * @return
     */
    public Page<Material> findByNameLike(String name, Pageable pageable);

    /**
     * 通过名称模糊查询
     *
     * @param name
     * @return
     */
    public List<Material> findByNameLike(String name);
}
