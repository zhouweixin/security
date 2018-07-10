package com.xplusplus.security.repository;

import com.xplusplus.security.domain.LossEntry;
import com.xplusplus.security.domain.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface LossEntryRepository extends JpaRepository<LossEntry, Long> {
    /**
     * 通过物品查询-分页
     *
     * @param materials
     * @param pageable
     * @return
     */
    public Page<LossEntry> findByMaterialIn(Collection<Material> materials, Pageable pageable);

    /**
     * 通过物品和状态查询-分页
     *
     * @param status
     * @param pageable
     * @return
     */
    public Page<LossEntry> findByStatusAndMaterialIn(int status, Collection<Material> materials, Pageable pageable);
}
