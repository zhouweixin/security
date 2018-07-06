package com.xplusplus.security.repository;

import com.xplusplus.security.domain.PurchaseAuditProcess;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface PurchaseAuditProcessRepository extends JpaRepository<PurchaseAuditProcess, Integer> {
    /**
     * 通过名称模糊查询-分页
     * @param name
     * @param pageable
     * @return
     */
    public Page<PurchaseAuditProcess> findByNameLike(String name, Pageable pageable);
}
