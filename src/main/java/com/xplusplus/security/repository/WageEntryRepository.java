package com.xplusplus.security.repository;

import com.xplusplus.security.domain.WageEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 10:58 2018/8/12
 * @Modified By:
 */
public interface WageEntryRepository extends JpaRepository<WageEntry, Long> {
    /**
     * 删除用户某月的工资
     *
     * @param userIds
     * @param d1
     * @param d2
     */
    public void deleteByUserIdInAndDateBetweenAndStatus(Collection<String> userIds, Date d1, Date d2, int status);

    /**
     * 通过日期和用户查询-分页
     *
     * @param d1
     * @param d2
     * @param userIds
     * @param pageable
     * @return
     */
    public Page<WageEntry> findByDateBetweenAndUserIdIn(Date d1, Date d2, Collection<String> userIds, Pageable pageable);

    /**
     * 通过日期查询所有
     *
     * @param date
     * @return
     */
    public List<WageEntry> findByDate(Date date);

    /**
     * 通过日期查询
     *
     * @param date
     * @return
     */
    public WageEntry findFirstByDate(Date date);

    /**
     * 通过日期删除
     *
     * @param date
     */
    public void deleteByDate(Date date);
}
