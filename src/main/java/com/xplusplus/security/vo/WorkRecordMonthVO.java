package com.xplusplus.security.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xplusplus.security.domain.WorkRecord;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:52 2018/7/31
 * @Modified By:
 */
@ApiModel(value = "工作记录")
public class WorkRecordMonthVO {
    @ApiModelProperty("用户工号")
    private String userId;
    @ApiModelProperty("员工名")
    private String userName;;
    @ApiModelProperty("工作天数")
    private int days = 0;
    @ApiModelProperty("总天数")
    private int sumDays = 0;
    @ApiModelProperty("工作小时数")
    private int hours = 0;
    @ApiModelProperty("实际工作小时数")
    private int realHours = 0;

    public WorkRecordMonthVO(int sumDays) {
        this.sumDays = sumDays;
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

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getRealHours() {
        return realHours;
    }

    public void setRealHours(int realHours) {
        this.realHours = realHours;
    }

    public static List<WorkRecordMonthVO> parseWorkRecords(List<WorkRecord> workRecords, Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int sumDays = calendar.getMaximum(Calendar.DAY_OF_MONTH);

        // 按员工分组
        Map<String, List<WorkRecord>> userId2workRecords = new HashMap<String, List<WorkRecord>>();
        Map<String, WorkRecordMonthVO> userId2workRecordMonthVOs = new HashMap<String, WorkRecordMonthVO>();

        for(WorkRecord workRecord : workRecords){
            String userId = workRecord.getUser().getId();
            List<WorkRecord> wrs = userId2workRecords.getOrDefault(userId, new ArrayList<>());
            wrs.add(workRecord);
            userId2workRecords.put(userId, wrs);

            if(!userId2workRecordMonthVOs.containsKey(userId)){
                WorkRecordMonthVO vo = new WorkRecordMonthVO(sumDays);
                vo.setUserId(userId);
                vo.setUserName(workRecord.getUser().getName());
                userId2workRecordMonthVOs.put(userId, vo);
            }
        }

        for(String userId:userId2workRecords.keySet()){
            List<WorkRecord> workRecordList = userId2workRecords.get(userId);
            WorkRecordMonthVO vo = userId2workRecordMonthVOs.get(userId);

            Set<Integer> daySet = new HashSet<Integer>();
            for(WorkRecord workRecord : workRecordList){
                if(workRecord.getStatus() != 1){
                    continue;
                }
                vo.setHours(vo.getHours()+workRecord.getHours());
                vo.setRealHours(vo.getRealHours()+workRecord.getRealHours());
                Calendar c = Calendar.getInstance();
                if(workRecord.getStartTime() != null)
                    c.setTime(workRecord.getStartTime());
                if(workRecord.getHours() > 0)
                    daySet.add(c.get(Calendar.DAY_OF_MONTH));
            }
            vo.setDays(daySet.size());
        }

        return new ArrayList<>(userId2workRecordMonthVOs.values());
    }

    public int getSumDays() {
        return sumDays;
    }

    public void setSumDays(int sumDays) {
        this.sumDays = sumDays;
    }
}
