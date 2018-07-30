package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.WorkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
     * 通过员工, 负责人和项目查询
     *
     * @param user
     * @param leader
     * @param project
     * @return
     */
    public WorkRecord findFirstByUserAndLeaderAndProjectAndStatus(User user, User leader, Project project, int status);

    /**
     * 通过负责人, 项目和状态查询
     *
     * @param leader
     * @param project
     * @param status
     * @return
     */
    public List<WorkRecord> findByLeaderAndProjectAndStatus(User leader, Project project, int status);
}
