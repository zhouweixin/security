package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.WorkLogging;
import com.xplusplus.security.domain.WorkLoggingStatus;
import com.xplusplus.security.service.WorkLoggingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 21:49 2018/6/1
 * @Modified By:
 */
@Repository
public interface WorkLoggingRepository extends JpaRepository<WorkLogging, Long> {
    /**
     * 通过状态查询-分页
     *
     * @param workLoggingStatus
     * @return
     */
    public Page<WorkLogging> findByStatus(WorkLoggingStatus workLoggingStatus, Pageable pageable);

    /**
     * 通过用户查询-分页
     *
     * @param user
     * @param pageable
     * @return
     */
    public Page<WorkLogging> findByUser(User user, Pageable pageable);

    /**
     * 更新状态
     *
     * @param workLoggingStatus
     * @param note
     * @param modifyDate
     * @param modifyDate
     * @param id
     */
    @Modifying
    @Query(value = "update WorkLogging w set w.status=?1, w.note=?2 where w.id=?3")
    public void updateStatusAndNoteAndModifyUserAndModifyDateById(WorkLoggingStatus workLoggingStatus, String note, User modifyUser, Date modifyDate, Long id);

    /**
     * 查询某天某项目有效打卡的人数
     *
     * @return
     */
    @Query(value = "select count(w.user) from WorkLogging w where w.project=?1 and w.startTime>=?2 and w.startTime<?3 and w.status=1")
    public int findByProjectAndStartTimeAndStatus(Project project, Date date1, Date date2);

    /**
     * 通过用户和状态查询
     *
     * @param user
     * @param status
     * @return
     */
    public WorkLogging findFirstByUserAndStatus(User user, WorkLoggingStatus status);
}
