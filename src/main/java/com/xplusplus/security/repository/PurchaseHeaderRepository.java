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

import java.util.Collection;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface PurchaseHeaderRepository extends JpaRepository<PurchaseHeader, Long> {

    /**
     * 通过当前审核人和状态查询-分页
     *
     * @param curAuditor
     * @param status
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByCurAuditorAndStatus(User curAuditor, int status, Pageable pageable);

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

    /**
     * 通过申请人查询-分页
     *
     * @param user
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByApplyUser(User user, Pageable pageable);

    /**
     * 通过状态查询-分页
     *
     * @param status
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByStatus(int status, Pageable pageable);

    /**
     * 通过申请人和状态查询
     *
     * @param user
     * @param status
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByApplyUserAndStatus(User user, int status, Pageable pageable);

    /**
     * 通过编码和状态删除
     *
     * @param ids
     * @param status
     */
    public void deleteByIdInAndStatus(Collection<Long> ids, int status);

    /**
     * 通过id查询-分页
     *
     * @param ids
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByIdIn(Collection<Long> ids, Pageable pageable);

    /**
     * 通过id和状态查询-分页
     *
     * @param ids
     * @param pageable
     * @return
     */
    public Page<PurchaseHeader> findByIdInAndStatus(Collection<Long> ids, int status, Pageable pageable);
}
