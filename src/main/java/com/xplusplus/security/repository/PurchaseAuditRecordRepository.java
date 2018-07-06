package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Purchase;
import com.xplusplus.security.domain.PurchaseAuditRecord;
import com.xplusplus.security.domain.PurchaseHeader;
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
public interface PurchaseAuditRecordRepository extends JpaRepository<PurchaseAuditRecord, Long> {
    /**
     * 通过采购申请表头查询
     *
     * @param purchaseHeader
     * @return
     */
    public List<PurchaseAuditRecord> findByPurchaseHeader(PurchaseHeader purchaseHeader);
}
