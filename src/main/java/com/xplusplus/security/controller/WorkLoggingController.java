package com.xplusplus.security.controller;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.service.WorkLoggingService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 22:19 2018/6/1
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/workLogging")
public class WorkLoggingController {
    @Autowired
    private WorkLoggingService workLoggingService;

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    public Result<List<WorkLogging>> getAll() {
        return ResultUtil.success(workLoggingService.findAll());
    }

    /**
     * 查询所有-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getAllByPage")
    public Result<Page<WorkLogging>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                             @RequestParam(value = "size", defaultValue = "10") Integer size,
                                             @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                             @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(workLoggingService.findAllByPage(page, size, sortFieldName, asc));
    }

    /**
     * 通过用户查询-分页
     *
     * @param user
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByUserByPage")
    public Result<Page<WorkLogging>> findByStatusByPage(User user, @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                  @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                  @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                  @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(workLoggingService.findByUserByPage(user, page, size, sortFieldName, asc));
    }


    /**
     * 通过状态查询-分页
     *
     * @param status
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByStatusByPage")
    public Result<Page<WorkLogging>> getByStatusByPage(WorkLoggingStatus status, @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                     @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                     @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                     @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(workLoggingService.findByStatusByPage(status, page, size, sortFieldName, asc));
    }

    /**
     * 修改状态
     *
     * @param statusId
     * @param note
     * @param modifyUserId
     * @param id
     * @return
     */
    @RequestMapping(value = "/updateStatus")
    public Result<Object> updateStatusAndNoteAndModifyUserAndModifyDateById(Integer statusId, String note, String modifyUserId, Long id){
        workLoggingService.updateStatusAndNoteAndModifyUserAndModifyDateById(statusId, note, modifyUserId, id);
        return ResultUtil.success();
    }

    /**
     * 上班打卡
     *
     * @param attendanceGroupId 考勤组编码
     * @param userId 用户编码
     * @param longitude 经度
     * @param latitude 纬度
     * @return
     */
    @RequestMapping(value = "/goWork")
    public Result<Object> goWork(int attendanceGroupId, String userId, double longitude, double latitude){
        workLoggingService.goWork(attendanceGroupId, userId, userId, longitude, latitude);
        return ResultUtil.success();
    }

    /**
     * 下班
     *
     * @param userId
     * @param longitude
     * @param latitude
     * @return
     */
    @RequestMapping(value = "/offWork")
    public Result<Object> offWork(int attendanceGroupId, String userId, double longitude, double latitude){
        workLoggingService.offWork(attendanceGroupId, userId, longitude, latitude);
        return ResultUtil.success();
    }

    /**
     * 批量上班打卡
     *
     * @param leaderId
     * @param userIds
     * @param longitude
     * @param latitude
     * @return
     */
    @RequestMapping(value = "/goWorkBatch")
    public Result<Object> goWorkBatch(int attendanceGroupId, int attenceGroupId, String leaderId, String[] userIds, double longitude, double latitude){
        workLoggingService.goWorkBatch(attendanceGroupId, attenceGroupId, leaderId, userIds, longitude, latitude);
        return ResultUtil.success();
    }

    /**
     * 批量下班打卡
     *
     * @param leaderId
     * @param userIds
     * @param longitude
     * @param latitude
     * @return
     */
    @RequestMapping(value = "/offWorkBatch")
    public Result<Object> offWorkBatch(int attenceGroupId, String leaderId, String[] userIds, double longitude, double latitude){
        workLoggingService.offWorkBatch(attenceGroupId, leaderId, userIds, longitude, latitude);
        return ResultUtil.success();
    }
}
