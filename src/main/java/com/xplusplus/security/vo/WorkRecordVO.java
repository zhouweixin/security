package com.xplusplus.security.vo;

import com.xplusplus.security.domain.WorkRecord;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:52 2018/7/31
 * @Modified By:
 */
@ApiModel(value = "工作记录")
public class WorkRecordVO {
    // 工作记录主键
    @ApiModelProperty("工作记录主键")
    private Long workRecordId;
    // 员工工号
    @ApiModelProperty("用户工号")
    private String userId;
    // 员工名
    @ApiModelProperty("员工名")
    private String userName;
    // 开始时间
    @ApiModelProperty("开始时间")
    private String startTime;
    // 结束时间
    @ApiModelProperty("结束时间")
    private String endTime;
    // 状态
    @ApiModelProperty("状态")
    private String status;

    public WorkRecordVO() {
    }

    public WorkRecordVO(WorkRecord workRecord) {
        if(workRecord == null){
            return;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        this.workRecordId = workRecord.getId();
        this.userId = workRecord.getUser().getId();
        this.userName = workRecord.getUser().getName();
        if(workRecord.getStartTime() != null) {
            this.startTime = sdf.format(workRecord.getStartTime());
        }
        if(workRecord.getEndLatitude() != null) {
            this.endTime = sdf.format(workRecord.getEndTime());
        }
        this.status = workRecord.parseStatus();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<WorkRecordVO> parseWorkRecords(List<WorkRecord> workRecords) {
        List<WorkRecordVO> workRecordVOS = new ArrayList<>();
        for(WorkRecord workRecord : workRecords){
            workRecordVOS.add(new WorkRecordVO(workRecord));
        }
        return workRecordVOS;
    }

    public Long getWorkRecordId() {
        return workRecordId;
    }

    public void setWorkRecordId(Long workRecordId) {
        this.workRecordId = workRecordId;
    }
}
