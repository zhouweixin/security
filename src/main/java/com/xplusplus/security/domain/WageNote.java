package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 薪资记录表
 * @Date: Created in 22:00 2018/6/12
 * @Modified By:
 */
@Entity
public class WageNote {
    // 主键id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 工作记录
     */
    @OneToOne(targetEntity = WorkLogging.class)
    @JoinColumn(name = "work_logging_id", referencedColumnName = "id")
    private WorkLogging workLogging;

    /**
     * 用户
     */
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    /**
     * 项目
     */
    @ManyToOne(targetEntity = Project.class)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    // 日期
    @Temporal(value = TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    // 基本工资
    @Column(precision = 2)
    private Double baseMoney;

    // 项目工资
    @Column(precision = 2)
    private Double projectMoney;

    // 迟到扣款
    @Column(precision = 2)
    private Double lateDeductMoney;

    // 严重扣款
    @Column(precision = 2)
    private Double seriouslyLateDeductMoney;

    // 病假扣款
    @Column(precision = 2)
    private Double sickLeaveDeductMoney;

    // 事假扣款
    @Column(precision = 2)
    private Double thingLeaveDeductMoney;

    // 绩效奖金
    @Column(precision = 2)
    private Double performanceRewardMoney;

    // 工龄奖金
    @Column(precision = 2)
    private Double workAgeRewardMoney;

    // 其它扣款
    @Column(precision = 2)
    private Double otherDeductMoney;

    // 其它扣款备注
    private String otherDeductNote;

    // 其它奖金
    @Column(precision = 2)
    private Double otherRewardMoney;

    // 其它奖金备注
    private String otherRewardNote;

    // 理论发钱
    @Column(precision = 2)
    private Double theoryMoney;

    // 实际发钱
    @Column(precision = 2)
    private Double realMoney;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getBaseMoney() {
        return baseMoney;
    }

    public void setBaseMoney(Double baseMoney) {
        this.baseMoney = baseMoney;
    }

    public Double getProjectMoney() {
        return projectMoney;
    }

    public void setProjectMoney(Double projectMoney) {
        this.projectMoney = projectMoney;
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

    public Double getOtherDeductMoney() {
        return otherDeductMoney;
    }

    public void setOtherDeductMoney(Double otherDeductMoney) {
        this.otherDeductMoney = otherDeductMoney;
    }

    public String getOtherDeductNote() {
        return otherDeductNote;
    }

    public void setOtherDeductNote(String otherDeductNote) {
        this.otherDeductNote = otherDeductNote;
    }

    public Double getOtherRewardMoney() {
        return otherRewardMoney;
    }

    public void setOtherRewardMoney(Double otherRewardMoney) {
        this.otherRewardMoney = otherRewardMoney;
    }

    public String getOtherRewardNote() {
        return otherRewardNote;
    }

    public void setOtherRewardNote(String otherRewardNote) {
        this.otherRewardNote = otherRewardNote;
    }

    public Double getTheoryMoney() {
        return theoryMoney;
    }

    public void setTheoryMoney(Double theoryMoney) {
        this.theoryMoney = theoryMoney;
    }

    public WorkLogging getWorkLogging() {
        return workLogging;
    }

    public void setWorkLogging(WorkLogging workLogging) {
        this.workLogging = workLogging;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Double getRealMoney() {
        return realMoney;
    }

    public void setRealMoney(Double realMoney) {
        this.realMoney = realMoney;
    }
}
