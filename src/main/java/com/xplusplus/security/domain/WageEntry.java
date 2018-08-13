package com.xplusplus.security.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xplusplus.security.vo.WorkRecordMonthVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author: zhouweixin
 * @Description: 工资单: 应发工资 = (基本工资 + 全勤奖 + 补助) * 月工作天数 / 月总天数 + 奖金
 * 补助 = 固定加班费 + 社保补助
 * 其中:工作缺4天之内都算全勤
 * @Date: Created in 10:22 2018/8/12
 * @Modified By:
 */
@Entity
@ApiModel(value = "工资单")
public class WageEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "主键: 自增长")
    private Long id;

    @ApiModelProperty(value = "工号")
    private String userId = "";

    @ApiModelProperty(value = "姓名")
    private String userName = "";

    @ApiModelProperty(value = "原岗点")
    private String originalSpot = "";

    @ApiModelProperty(value = "日期， 格式：yyyy-MM")
    @JsonFormat(pattern = "yyyy-MM")
    @Temporal(value = TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM")
    private Date date;

    @ApiModelProperty(value = "证件号码")
    private String idNumber;

    @ApiModelProperty(value = "卡号")
    private String cardNumber = "";

    @ApiModelProperty(value = "基本工资")
    @Column(precision = 2)
    private double baseWage = 0.00;

    @ApiModelProperty(value = "项目工资")
    @Column(precision = 2)
    private double projectWage = 0.00;

    @ApiModelProperty(value = "全勤奖")
    @Column(precision = 2)
    private double fullAttenBonus = 0.00;

    @ApiModelProperty(value = "加班天数")
    private int overtimeDays = 0;

    @ApiModelProperty(value = "加班费")
    @Column(precision = 2)
    private double overtimeWage = 0.00;

    @ApiModelProperty(value = "顶岗加班费")
    @Column(precision = 2)
    private double topSpotWage = 0.00;

    @ApiModelProperty(value = "延时加班费")
    @Column(precision = 2)
    private double delayWage = 0.00;

    @ApiModelProperty(value = "伙食费")
    @Column(precision = 2)
    private double boardWage = 0.00;

    @ApiModelProperty(value = "固定加班费")
    @Column(precision = 2)
    private double fixedOvertimeWage = 0.00;

    @ApiModelProperty(value = "社保补助")
    @Column(precision = 2)
    private double socialSecuritySubsidyWage = 0.00;

    @ApiModelProperty(value = "奖金")
    @Column(precision = 2)
    private double bonus = 0.00;

    @ApiModelProperty(value = "基金")
    @Column(precision = 2)
    private double foundation = 0.00;

    @ApiModelProperty(value = "应扣款项")
    @Column(precision = 2)
    private double deductionWage = 0.00;

    @ApiModelProperty(value = "个税")
    @Column(precision = 2)
    private double personalTax = 0.00;

    @ApiModelProperty(value = "工作小时数")
    private int workHours = 0;

    @ApiModelProperty(value = "工作天数")
    private int workDays = 0;

    @ApiModelProperty(value = "月总天数")
    private int sumDays = 31;

    @ApiModelProperty(value = "应发工资")
    @Column(precision = 2)
    private double grossPay = 0.00;

    @ApiModelProperty(value = "实发工资")
    @Column(precision = 2)
    private double realPay = 0.00;

    @ApiModelProperty(value = "签名")
    private String underWrite = "";

    @ApiModelProperty(value = "备注")
    private String note = "";

    @ApiModelProperty(value = "状态：0未发；1已发")
    private int status = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getOriginalSpot() {
        return originalSpot;
    }

    public void setOriginalSpot(String originalSpot) {
        this.originalSpot = originalSpot;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public double getBaseWage() {
        return baseWage;
    }

    public void setBaseWage(double baseWage) {
        this.baseWage = baseWage;
    }

    public double getFullAttenBonus() {
        return fullAttenBonus;
    }

    public void setFullAttenBonus(double fullAttenBonus) {
        this.fullAttenBonus = fullAttenBonus;
    }

    public int getOvertimeDays() {
        return overtimeDays;
    }

    public void setOvertimeDays(int overtimeDays) {
        this.overtimeDays = overtimeDays;
    }

    public double getOvertimeWage() {
        return overtimeWage;
    }

    public void setOvertimeWage(double overtimeWage) {
        this.overtimeWage = overtimeWage;
    }

    public double getTopSpotWage() {
        return topSpotWage;
    }

    public void setTopSpotWage(double topSpotWage) {
        this.topSpotWage = topSpotWage;
    }

    public double getDelayWage() {
        return delayWage;
    }

    public void setDelayWage(double delayWage) {
        this.delayWage = delayWage;
    }

    public double getBoardWage() {
        return boardWage;
    }

    public void setBoardWage(double boardWage) {
        this.boardWage = boardWage;
    }

    public double getFixedOvertimeWage() {
        return fixedOvertimeWage;
    }

    public void setFixedOvertimeWage(double fixedOvertimeWage) {
        this.fixedOvertimeWage = fixedOvertimeWage;
    }

    public double getSocialSecuritySubsidyWage() {
        return socialSecuritySubsidyWage;
    }

    public void setSocialSecuritySubsidyWage(double socialSecuritySubsidyWage) {
        this.socialSecuritySubsidyWage = socialSecuritySubsidyWage;
    }

    public double getBonus() {
        return bonus;
    }

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }

    public double getFoundation() {
        return foundation;
    }

    public void setFoundation(double foundation) {
        this.foundation = foundation;
    }

    public double getDeductionWage() {
        return deductionWage;
    }

    public void setDeductionWage(double deductionWage) {
        this.deductionWage = deductionWage;
    }

    public double getPersonalTax() {
        return personalTax;
    }

    public void setPersonalTax(double personalTax) {
        this.personalTax = personalTax;
    }

    public double getGrossPay() {
        return grossPay;
    }

    public void setGrossPay(double grossPay) {
        this.grossPay = grossPay;
    }

    public double getRealPay() {
        return realPay;
    }

    public void setRealPay(double realPay) {
        this.realPay = realPay;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getWorkDays() {
        return workDays;
    }

    public void setWorkDays(int workDays) {
        this.workDays = workDays;
    }

    public String getUnderWrite() {
        return underWrite;
    }

    public void setUnderWrite(String underWrite) {
        this.underWrite = underWrite;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getSumDays() {
        return sumDays;
    }

    public void setSumDays(int sumDays) {
        this.sumDays = sumDays;
    }

    public int getWorkHours() {
        return workHours;
    }

    public void setWorkHours(int workHours) {
        this.workHours = workHours;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public double getProjectWage() {
        return projectWage;
    }

    public void setProjectWage(double projectWage) {
        this.projectWage = projectWage;
    }

    /**
     * 计算应得工资:  应得工资=(基本工资+全勤+补助) * 工作天数 / 当月总天数 + 奖金
     */
    public void computePay() {
        grossPay = (baseWage + fullAttenBonus + fixedOvertimeWage + socialSecuritySubsidyWage) * workDays / sumDays + bonus + overtimeWage + topSpotWage + delayWage + boardWage + projectWage;
        realPay = grossPay - deductionWage - foundation - personalTax;
    }
}
