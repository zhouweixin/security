package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Result;
import com.xplusplus.security.domain.WorkRecord;
import com.xplusplus.security.service.UserService;
import com.xplusplus.security.service.WorkRecordService;
import com.xplusplus.security.utils.ResultUtil;
import com.xplusplus.security.vo.WorkRecordMonthVO;
import com.xplusplus.security.vo.WorkRecordVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
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
@Api(tags = "工作记录接口")
public class WorkRecordController {

    @Autowired
    private WorkRecordService workRecordService;

    /**
     * 上班打卡
     *
     * @return
     */
    @PostMapping(value = "/onDuty")
    @ApiOperation(value = "上班打卡")
    public Result<WorkRecordVO> onDuty(
            @ApiParam(value = "用户主键") @RequestParam String userId,
            @ApiParam(value = "负责人主键") @RequestParam String leaderId,
            @ApiParam(value = "项目主键") @RequestParam Long projectId,
            @ApiParam(value = "上班经度") @RequestParam(defaultValue = "0") Double startLongitude,
            @ApiParam(value = "上班纬度") @RequestParam(defaultValue = "0") Double startLatitude,
            @ApiParam(value = "上班时间,格式为yyyy-MM-dd HH:mm") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startTime) {
        return ResultUtil.success(workRecordService.onDuty(userId, leaderId, projectId, startLongitude, startLatitude, startTime));
    }

    /**
     * 下班打卡
     *
     * @return
     */
    @PostMapping(value = "/offDuty")
    @ApiOperation(value = "下班打卡")
    public Result<WorkRecordVO> offDuty(
            @ApiParam(value = "用户主键") @RequestParam String userId,
            @ApiParam(value = "负责人主键") @RequestParam String leaderId,
            @ApiParam(value = "项目主键") @RequestParam Long projectId,
            @ApiParam(value = "下班经度") @RequestParam Double endLongitude,
            @ApiParam(value = "下班纬度") @RequestParam Double endLatitude,
            @ApiParam(value = "下班时间,格式为yyyy-MM-dd HH:mm") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endTime) {
        return ResultUtil.success(workRecordService.offDuty(userId, leaderId, projectId, endLongitude, endLatitude, endTime));
    }

    /**
     * 通过负责人, 项目, 状态和日期查询
     *
     * @param leaderId
     * @param projectId
     * @param status
     * @return
     */
    @PostMapping(value = "/getByLeaderAndProjectAndStatusAndDate")
    @ApiOperation(value = "通过负责人, 项目, 状态和日期查询")
    public Result<List<WorkRecordVO>> getByLeaderAndProjectAndStatus(
            @ApiParam(value = "负责人主键") @RequestParam String leaderId,
            @ApiParam(value = "项目主键") @RequestParam Long projectId,
            @ApiParam(value = "状态") @RequestParam int status,
            @ApiParam(value = "日期,格式为yyyy-MM-dd") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return ResultUtil.success(workRecordService.getByLeaderAndProjectAndStatusAndDate(leaderId, projectId, status, date));
    }

    /**
     * 通过主键删除
     *
     * @param id
     * @return
     */
    @PostMapping(value = "/deleteById")
    @ApiOperation(value = "通过主键删除")
    public Result<List<WorkRecordVO>> deleteById(@ApiParam(value = "主键") @RequestParam Long id) {
        workRecordService.deleteById(id);
        return ResultUtil.success();
    }

    @PostMapping(value = "/deleteByIdBatch")
    @ApiOperation(value = "批量删除")
    public Result<List<WorkRecordVO>> deleteByIdBatch(@ApiParam(value = "主键数组") @RequestParam Long[] ids) {
        workRecordService.deleteByIdBatch(ids);
        return ResultUtil.success();
    }

    @PostMapping(value = "/addBatch")
    @ApiOperation(value = "批量新增")
    public Result<List<WorkRecordVO>> add(
            @ApiParam(value = "用户主键多个") @RequestParam String[] userIds,
            @ApiParam(value = "负责人主键") @RequestParam String leaderId,
            @ApiParam(value = "项目主键") @RequestParam Long projectId,
            @ApiParam(value = "上班经度") @RequestParam(defaultValue = "0") Double startLongitude,
            @ApiParam(value = "上班纬度") @RequestParam(defaultValue = "0") Double startLatitude,
            @ApiParam(value = "上班时间,格式为yyyy-MM-dd HH:mm") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startTime,
            @ApiParam(value = "下班经度") @RequestParam Double endLongitude,
            @ApiParam(value = "下班纬度") @RequestParam Double endLatitude,
            @ApiParam(value = "下班时间,格式为yyyy-MM-dd HH:mm") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endTime,
            @ApiParam(value = "备注说明") @RequestParam String note,
            @ApiParam(value = "状态：0上班；1下班；2缺卡", defaultValue = "1") @RequestParam(defaultValue = "1") Integer status) {

        return ResultUtil.success(workRecordService.save(userIds, leaderId, projectId, startLongitude, startLatitude, startTime, endLongitude, endLatitude, endTime, note, status));
    }

    @PostMapping(value = "/updateBatch")
    @ApiOperation(value = "批量编辑")
    public Result<List<WorkRecordVO>> updateBatch(
            @ApiParam(value = "主键") @RequestParam Long[] ids,
            @ApiParam(value = "负责人主键") @RequestParam String leaderId,
            @ApiParam(value = "项目主键") @RequestParam Long projectId,
            @ApiParam(value = "上班经度") @RequestParam(defaultValue = "0") Double startLongitude,
            @ApiParam(value = "上班纬度") @RequestParam(defaultValue = "0") Double startLatitude,
            @ApiParam(value = "上班时间,格式为yyyy-MM-dd HH:mm") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startTime,
            @ApiParam(value = "下班经度") @RequestParam Double endLongitude,
            @ApiParam(value = "下班纬度") @RequestParam Double endLatitude,
            @ApiParam(value = "下班时间,格式为yyyy-MM-dd HH:mm") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date endTime,
            @ApiParam(value = "备注说明") @RequestParam String note,
            @ApiParam(value = "状态：0上班；1下班；2缺卡", defaultValue = "1") @RequestParam(defaultValue = "1") Integer status) {


        return ResultUtil.success(workRecordService.update(ids, leaderId, projectId, startLongitude, startLatitude, startTime, endLongitude, endLatitude, endTime, note, status));
    }

    @GetMapping(value = "/getByProjectAndDateAndNameLike")
    @ApiOperation(value = "通过项目, 日期和姓名模糊查询-分页")
    public Result<Page<WorkRecord>> getByProjectAndDateAndNameLike(
            @ApiParam(value = "项目主键，默认为-1表示不启用此字段检索", defaultValue = "-1") @RequestParam(defaultValue = "-1") Long projectId,
            @ApiParam(value = "日期, 格式为yyyy-MM-dd, 默认为2000-01-01表示不启用此字段检索", defaultValue = "2000-01-01") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @ApiParam(value = "姓名, 默认为\"\"表示查询所有", defaultValue = "") @RequestParam(defaultValue = "") String name,
            @ApiParam(value = "页码", defaultValue = "0") @RequestParam(value = "page", defaultValue = "0") Integer page,
            @ApiParam(value = "每页记录数", defaultValue = "10") @RequestParam(value = "size", defaultValue = "10") Integer size,
            @ApiParam(value = "排序字段名", defaultValue = "startTime")@RequestParam(value = "sortFieldName", defaultValue = "startTime") String sortFieldName,
            @ApiParam(value = "排序方向, 0降序; 1升序", defaultValue = "0")@RequestParam(value = "asc", defaultValue = "0") Integer asc){
        return ResultUtil.success(workRecordService.getByProjectAndDateAndNameLike(projectId, date, name, page, size, sortFieldName, asc));
    }

    /**
     * 月度总结
     *
     * @param projectId
     * @param date
     * @param name
     * @return
     */
    @GetMapping(value = "/getByMonth")
    @ApiOperation(value = "月度统计-分页")
    public Result<List<WorkRecordMonthVO>> getByMonth(
            @ApiParam(value = "项目主键，默认为-1表示不启用此字段检索", defaultValue = "-1") @RequestParam(defaultValue = "-1") Long projectId,
            @ApiParam(value = "日期, 格式为yyyy-MM, 默认为2000-01表示不启用此字段检索", defaultValue = "2000-01") @RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date date,
            @ApiParam(value = "姓名, 默认为\"\"表示查询所有", defaultValue = "") @RequestParam(defaultValue = "") String name){
        return ResultUtil.success(workRecordService.getByMonth(projectId, date, name));
    }
}
