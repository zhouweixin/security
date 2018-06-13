package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 薪资方案
 * @Date: Created in 19:49 2018/6/12
 * @Modified By:
 */
@Entity
public class Wage {
    // 主键, 自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 名称
    private String name;

    // 工资记录生成时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "dd HH:mm:ss")
    private Date newTime;

    // 基本工资
    @Column(precision = 2)
    private Double baseMoney = 0.0;

    // 最大工资
    @Column(precision = 2)
    private Double maxMoney = 0.0;

    // 人数
    private Integer sum = 0;

    // 迟到扣款
    @Column(precision = 2)
    private Double lateDeductMoney = 0.0;

    // 严重迟到扣款
    @Column(precision = 2)
    private Double seriouslyLateDeductMoney = 0.0;

    // 病假扣款
    @Column(precision = 2)
    private Double sickLeaveDeductMoney = 0.0;

    // 事假扣款
    @Column(precision = 2)
    private Double thingLeaveDeductMoney = 0.0;

    // 级效奖金
    @Column(precision = 2)
    private Double performanceRewardMoney = 0.0;

    // 工龄奖金
    @Column(precision = 2)
    private Double workAgeRewardMoney = 0.0;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getNewTime() {
        return newTime;
    }

    public void setNewTime(Date newTime) {
        this.newTime = newTime;
    }

    public Double getBaseMoney() {
        return baseMoney;
    }

    public void setBaseMoney(Double baseMoney) {
        this.baseMoney = baseMoney;
    }

    public Double getMaxMoney() {
        return maxMoney;
    }

    public void setMaxMoney(Double maxMoney) {
        this.maxMoney = maxMoney;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public Double getLateDeductMoney() {
        return lateDeductMoney;
    }

    public void setLateDeductMoney(Double lateDeductMoney) {
        this.lateDeductMoney = lateDeductMoney;
    }

    public Double getSeriouslyLateDeductMoney() {
        return seriouslyLateDeductMoney;
    }

    public void setSeriouslyLateDeductMoney(Double seriouslyLateDeductMoney) {
        this.seriouslyLateDeductMoney = seriouslyLateDeductMoney;
    }

    public Double getSickLeaveDeductMoney() {
        return sickLeaveDeductMoney;
    }

    public void setSickLeaveDeductMoney(Double sickLeaveDeductMoney) {
        this.sickLeaveDeductMoney = sickLeaveDeductMoney;
    }

    public Double getThingLeaveDeductMoney() {
        return thingLeaveDeductMoney;
    }

    public void setThingLeaveDeductMoney(Double thingLeaveDeductMoney) {
        this.thingLeaveDeductMoney = thingLeaveDeductMoney;
    }

    public Double getPerformanceRewardMoney() {
        return performanceRewardMoney;
    }

    public void setPerformanceRewardMoney(Double performanceRewardMoney) {
        this.performanceRewardMoney = performanceRewardMoney;
    }

    public Double getWorkAgeRewardMoney() {
        return workAgeRewardMoney;
    }

    public void setWorkAgeRewardMoney(Double workAgeRewardMoney) {
        this.workAgeRewardMoney = workAgeRewardMoney;
    }

    @Override
    public String toString() {
        return "Wage{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", newTime=" + newTime +
                ", baseMoney=" + baseMoney +
                ", maxMoney=" + maxMoney +
                ", sum=" + sum +
                ", lateDeductMoney=" + lateDeductMoney +
                ", seriouslyLateDeductMoney=" + seriouslyLateDeductMoney +
                ", sickLeaveDeductMoney=" + sickLeaveDeductMoney +
                ", thingLeaveDeductMoney=" + thingLeaveDeductMoney +
                ", performanceRewardMoney=" + performanceRewardMoney +
                ", workAgeRewardMoney=" + workAgeRewardMoney +
                '}';
    }
}
