package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.WorkRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 16:21 2018/7/28
 * @Modified By:
 */
@Repository
public interface WorkRecordRepository extends JpaRepository<WorkRecord, Long> {

    /**
     * 通过负责人, 项目, 状态和上班打卡的时间查询
     *
     * @param leader
     * @param project
     * @param status
     * @return
     */
    public List<WorkRecord> findByLeaderAndProjectAndStatusAndStartTimeBetween(User leader, Project project, int status, Date date1, Date date2);

    /**
     * 通过负责人, 项目和上班打卡的时间查询
     *
     * @param leader
     * @param project
     * @return
     */
    public List<WorkRecord> findByLeaderAndProjectAndStartTimeBetween(User leader, Project project, Date date1, Date date2);

    /**
     * 通过用户和状态查询
     *
     * @param user
     * @param status
     * @return
     */
     public WorkRecord findFirstByUserAndStatus(User user, Integer status);

    /**
     * 批量删除
     *
     * @param ids
     */
    public void deleteByIdIn(Collection<Long> ids);

    /**
     * 通过用户查询-分页
     *
     * @param users
     * @param pageable
     * @return
     */
    public Page<WorkRecord> findByUserInAndStatus(Collection<User> users, Integer status, Pageable pageable);
    public List<WorkRecord> findByUserInAndStatus(Collection<User> users, Integer status);

    /**
     * 通过项目， 用户查询-分页
     * @param project
     * @param users
     * @param pageable
     * @return
     */
    public Page<WorkRecord> findByProjectAndUserInAndStatus(Project project, Collection<User> users, Integer status, Pageable pageable);
    public List<WorkRecord> findByProjectAndUserInAndStatus(Project project, Collection<User> users, Integer status);

    /**
     * 通过项目， 开始时间， 用户查询-分页
     *
     * @param project
     * @param date1
     * @param date2
     * @param users
     * @param pageable
     * @return
     */
    public Page<WorkRecord> findByProjectAndStartTimeBetweenAndUserInAndStatus(Project project, Date date1, Date date2, Collection<User> users, Integer status, Pageable pageable);
    public List<WorkRecord> findByProjectAndStartTimeBetweenAndUserInAndStatus(Project project, Date date1, Date date2, Collection<User> users, Integer status);
}
