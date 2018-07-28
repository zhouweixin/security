package com.xplusplus.security.service;

import com.xplusplus.security.domain.Pdf;
import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.WorkRecord;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.ProjectRepository;
import com.xplusplus.security.repository.UserRepository;
import com.xplusplus.security.repository.WorkRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 16:22 2018/7/28
 * @Modified By:
 */
@Service
public class WorkRecordService {
    @Autowired
    private WorkRecordRepository workRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * 上班打卡
     *
     * @param userId 员工id或ic卡号
     * @param leaderId 负责人id
     * @param projectId 项目id
     * @param startLongitude 上班打卡的径度
     * @param startLatitude 上班打卡的纬度
     * @param startTime 理论上班时间
     * @return
     */
    public WorkRecord onDuty(String userId, String leaderId, Long projectId, Double startLongitude, Double startLatitude, Date startTime) {
        User user = null;
        if((user = userRepository.findOne(userId)) == null && (user = userRepository.findFirstByIc(userId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_USER_NOT_EXIST);
        }

        User leader = null;
        if((leader = userRepository.findOne(leaderId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_EXISTS);
        }

        Project project = null;
        if((project = projectRepository.findOne(projectId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_PROJECT_NOT_EXISTS);
        }

        // 如果已经存在则会覆盖
        WorkRecord workRecord = workRecordRepository.findFirstByUserAndLeaderAndProjectAndStatus(user, leader, project, 0);
        if(workRecord == null) {
            workRecord = new WorkRecord(user, leader, project);
        }

        workRecord.setStartTime(startTime);
        workRecord.setRealStartTime(new Date());
        workRecord.setStartLongitude(startLongitude);
        workRecord.setStartLatitude(startLatitude);
        workRecord.setStatus(0);
        return workRecordRepository.save(workRecord);
    }

    /**
     * 下班打卡
     *
     * @param userId
     * @param leaderId
     * @param projectId
     * @param endLongitude
     * @param endLatitude
     * @param endTime
     * @return
     */
    public WorkRecord offDuty(String userId, String leaderId, Long projectId, Double endLongitude, Double endLatitude, Date endTime) {
        User user = null;
        if((user = userRepository.findOne(userId)) == null && (user = userRepository.findFirstByIc(userId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_USER_NOT_EXIST);
        }

        User leader = null;
        if((leader = userRepository.findOne(leaderId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_EXISTS);
        }

        Project project = null;
        if((project = projectRepository.findOne(projectId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_PROJECT_NOT_EXISTS);
        }

        WorkRecord workRecord = workRecordRepository.findFirstByUserAndLeaderAndProjectAndStatus(user, leader, project, 0);
        if(workRecord == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ON_DUTY_NOT_EXISTS);
        }

        workRecord.setEndTime(endTime);
        workRecord.setRealEndTime(new Date());
        workRecord.setEndLongitude(endLongitude);
        workRecord.setEndLatitude(endLatitude);
        workRecord.setStatus(1);

        return workRecordRepository.save(workRecord);
    }

    /**
     * 通过负责人, 项目和状态查询
     *
     * @param leaderId
     * @param projectId
     * @param status
     * @return
     */
    public List<WorkRecord> getByLeaderAndProjectAndStatus(String leaderId, Long projectId, int status) {
        List<WorkRecord> workRecords = new ArrayList<>();

        // 验证负责人和项目
        User leader = userRepository.findOne(leaderId);
        Project project = projectRepository.findOne(projectId);
        if( leader== null || project == null){
            return workRecords;
        }

        return workRecordRepository.findByLeaderAndProjectAndStatus(leader, project, status);
    }


}
