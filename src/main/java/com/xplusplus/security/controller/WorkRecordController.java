package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Result;
import com.xplusplus.security.domain.WorkRecord;
import com.xplusplus.security.service.UserService;
import com.xplusplus.security.service.WorkRecordService;
import com.xplusplus.security.utils.ResultUtil;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 16:22 2018/7/28
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/workRecord")
public class WorkRecordController {

    @Autowired
    private WorkRecordService workRecordService;

    /**
     * 上班打卡
     *
     * @return
     */
    @RequestMapping(value = "/onDuty")
    public Result<WorkRecord> onDuty(String userId,
                                     String leaderId,
                                     Long projectId,
                                     Double startLongitude,
                                     Double startLatitude,
                                     @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startTime) {
        return ResultUtil.success(workRecordService.onDuty(userId, leaderId, projectId, startLongitude, startLatitude, startTime));
    }

    /**
     * 下班打卡
     *
     * @return
     */
    @RequestMapping(value = "/offDuty")
    public Result<WorkRecord> offDuty(String userId,
                                      String leaderId,
                                      Long projectId,
                                      Double endLongitude,
                                      Double endLatitude,
                                      @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endTime) {
        return ResultUtil.success(workRecordService.offDuty(userId, leaderId, projectId, endLongitude, endLatitude, endTime));
    }

    /**
     * 通过负责人, 项目和状态查询
     *
     * @param leaderId
     * @param projectId
     * @param status
     * @return
     */
    @RequestMapping(value = "/getByLeaderAndProjectAndStatus")
    public Result<List<WorkRecord>> getByLeaderAndProjectAndStatus(String leaderId, Long projectId, int status){
        return ResultUtil.success(workRecordService.getByLeaderAndProjectAndStatus(leaderId, projectId, status));
    }
}
