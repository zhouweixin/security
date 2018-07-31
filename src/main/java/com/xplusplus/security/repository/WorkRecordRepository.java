package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.WorkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
     * 通过用户和状态查询
     *
     * @param user
     * @param status
     * @return
     */
     public WorkRecord findFirstByUserAndStatus(User user, Integer status);
}
