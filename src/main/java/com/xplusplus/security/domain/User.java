package com.xplusplus.security.domain;

import java.time.Period;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @Author: zhouweixin
 * @Description: 员工表
 * @Date: Created in 19:50 2018/5/7
 * @Modified By:
 */
@Entity
public class User {
	/**
	 * 编号:部门简称(2个字符)+5位数字
	 */
	@Id
	private String id;

	/**
	 * 姓名
	 */
	@NotNull(message = "名字不能为空")
	@NotBlank(message = "名字不能为空")
	@Column(nullable = false)
	private String name;

	/**
	 * 性别:0男; 1女
	 */
	private Integer sex = 0;

	/**
	 * ic号
	 */
	private String ic;

	/**
	 * 微信号
	 */
	private String wechat;

	/**
	 * 联系方式
	 */
	@NotNull(message = "手机号码不能为空")
	@NotBlank(message = "手机号码不能为空")
	private String contact;

	/**
	 * 密码
	 */
	private String password;

    /**
     * 出生日期
     */
    @Temporal(value = TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date bornDate;

	/**
	 * 部门
	 */
	@ManyToOne(targetEntity = Department.class)
	@JoinColumn(name = "department_id", referencedColumnName = "id")
	private Department department;

	/**
	 * 角色, 职位
	 */
	@ManyToOne(targetEntity = Role.class)
	@JoinColumn(name = "role_id", referencedColumnName = "id")
	private Role role;

	/**
	 * 工作性质
	 */
	@ManyToOne(targetEntity = JobNature.class)
	@JoinColumn(name = "job_nature_id", referencedColumnName = "id")
	private JobNature jobNature;

	/**
	 * 实习周期
	 */
	private Period period;

	/**
	 * 入职日期
	 */
	@Temporal(value = TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date employDate;

	/**
	 * 实习结束日期
	 */
	@Temporal(value = TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date practiceEndDate;

	/**
	 * 离职日期
	 */
	@Temporal(value = TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date resignDate;

    /**
     * 离职类型
     */
    @ManyToOne(targetEntity = ResignType.class)
    @JoinColumn(name = "resign_type_id", referencedColumnName = "id")
	private ResignType resignType;

    /**
     * 薪资方案
     */
    @ManyToOne(targetEntity = Wage.class)
    @JoinColumn(name = "wage_id", referencedColumnName = "id")
	private Wage wage;

    /**
     * 银行卡号
     */
    private String bankCardNum;

    @Column(precision = 2)
    private Double baseWage = 0.00;

    /**
     * 开户行
     */
    private String accountBank;

    @Column(precision = 2)
    private Double socialSecuritySubsidyWage = 0.00;

    @Column(precision = 2)
    private Double foundation = 0.00;

    public User() {
    }

    public User(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getIc() {
        return ic;
    }

    public void setIc(String ic) {
        this.ic = ic;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public JobNature getJobNature() {
        return jobNature;
    }

    public void setJobNature(JobNature jobNature) {
        this.jobNature = jobNature;
    }

    public Period getPeriod() {
        return period;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }

    public Date getEmployDate() {
        return employDate;
    }

    public void setEmployDate(Date employDate) {
        this.employDate = employDate;
    }

    public Date getPracticeEndDate() {
        return practiceEndDate;
    }

    public void setPracticeEndDate(Date practiceEndDate) {
        this.practiceEndDate = practiceEndDate;
    }

    public Date getResignDate() {
        return resignDate;
    }

    public void setResignDate(Date resignDate) {
        this.resignDate = resignDate;
    }

    public ResignType getResignType() {
        return resignType;
    }

    public void setResignType(ResignType resignType) {
        this.resignType = resignType;
    }

    public Wage getWage() {
        return wage;
    }

    public void setWage(Wage wage) {
        this.wage = wage;
    }

    public String getBankCardNum() {
        return bankCardNum;
    }

    public void setBankCardNum(String bankCardNum) {
        this.bankCardNum = bankCardNum;
    }

    public String getAccountBank() {
        return accountBank;
    }

    public void setAccountBank(String accountBank) {
        this.accountBank = accountBank;
    }

    public Date getBornDate() {
        return bornDate;
    }

    public void setBornDate(Date bornDate) {
        this.bornDate = bornDate;
    }

    public Double getBaseWage() {
        return baseWage;
    }

    public void setBaseWage(Double baseWage) {
        this.baseWage = baseWage;
    }

    public Double getSocialSecuritySubsidyWage() {
        return socialSecuritySubsidyWage;
    }

    public void setSocialSecuritySubsidyWage(Double socialSecuritySubsidyWage) {
        this.socialSecuritySubsidyWage = socialSecuritySubsidyWage;
    }

    public Double getFoundation() {
        return foundation;
    }

    public void setFoundation(Double foundation) {
        this.foundation = foundation;
    }
}
