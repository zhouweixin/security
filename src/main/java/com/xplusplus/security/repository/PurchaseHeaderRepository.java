package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Material;
import com.xplusplus.security.domain.PurchaseHeader;
import com.xplusplus.security.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface PurchaseHeaderRepository extends JpaRepository<PurchaseHeader, Long> {
    /**
     * 通过当前审核人查询-分页
     *
     * @param curAuditor
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByCurAuditor(User curAuditor, Pageable pageable);

    /**
     * 更新状态
     *
     * @param status
     * @param id
     */
    @Modifying
    @Query(value = "update PurchaseHeader p set p.status=?1 where p.id=?2")
    public void updateStatusById(int status, long id);

    /**
     * 更新当前审核人
     *
     * @param curAuditor
     * @param id
     */
    @Modifying
    @Query(value = "update PurchaseHeader p set p.curAuditor=?1 where p.id=?2")
    public void updateCurAuditorById(User curAuditor, long id);
}
