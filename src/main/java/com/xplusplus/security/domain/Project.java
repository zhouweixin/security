package com.xplusplus.security.domain;

import java.time.Period;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @Author: zhouweixin
 * @Description: 项目表
 * @Date: Created in 上午9:55:13 2018年5月23日
 */
@Entity
@ApiModel(value = "项目")
public class Project {
	// 主键
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "主键: 自增长")
	private Long id;

	// 名称
    @ApiModelProperty(value = "名称")
	private String name;

	// 开始日期
    @JsonFormat
	@Temporal(value = TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @ApiModelProperty(value = "开始日期, 格式yyyy-MM-dd")
	private Date startDate;

	// 结束日期
    @JsonFormat
	@Temporal(value = TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @ApiModelProperty(value = "结束日期, 格式yyyy-MM-dd")
	private Date endDate;

	// 服务周期
    @ApiModelProperty(value = "服务周期")
	private Period period;

	// 金额
	@Column(precision = 2, nullable = false, columnDefinition = "decimal(12, 2) default 0.0")
    @ApiModelProperty(value = "金额")
	private Double price = 0.0;

	// 已收金额
	@Column(precision = 2, nullable = false, columnDefinition = "decimal(12, 2)default 0.0")
    @ApiModelProperty(value = "已收金额")
	private Double receiptPrice = 0.0;

	// 客户办公室电话
    @ApiModelProperty(value = "客户办公室电话")
	private String customerOfficePhone;

	// 客户财务电话
    @ApiModelProperty(value = "客户财务电话")
	private String customerFinancePhone;

	// 客户单位
    @ApiModelProperty(value = "客户单位")
	private String customerUnit;

	// 扫描件地址
    @ApiModelProperty(value = "扫描件地址")
	private String scanningCopy;

	// 项目状态：0进行中；1已结束；
    @ManyToOne(targetEntity = ProjectStatus.class)
    @JoinColumn(name = "project_status_id", referencedColumnName = "id")
    @ApiModelProperty(value = "项目状态:0进行中; 1已结束")
	private ProjectStatus projectStatus;

	// 项目负责人
	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "leader_id", referencedColumnName = "id")
    @ApiModelProperty(value = "项目负责人")
	private User leader;

	@Column(precision = 2, columnDefinition = "default 0")
    @ApiModelProperty(value = "项目小时钱数")
	private double wagePerHour = 0.00;

    public Project() {
    }

    public Project(Long id) {
        this.id = id;
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Period getPeriod() {
		return period;
	}

	public void setPeriod(Period period) {
		this.period = period;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getCustomerOfficePhone() {
		return customerOfficePhone;
	}

	public void setCustomerOfficePhone(String customerOfficePhone) {
		this.customerOfficePhone = customerOfficePhone;
	}

	public String getCustomerFinancePhone() {
		return customerFinancePhone;
	}

	public void setCustomerFinancePhone(String customerFinancePhone) {
		this.customerFinancePhone = customerFinancePhone;
	}

	public String getCustomerUnit() {
		return customerUnit;
	}

	public void setCustomerUnit(String customerUnit) {
		this.customerUnit = customerUnit;
	}

	public User getLeader() {
		return leader;
	}

	public void setLeader(User leader) {
		this.leader = leader;
	}

	public ProjectStatus getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(ProjectStatus projectStatus) {
		this.projectStatus = projectStatus;
	}

	public Double getReceiptPrice() {
		return receiptPrice;
	}

	public void setReceiptPrice(Double receiptPrice) {
		this.receiptPrice = receiptPrice;
	}

	public String getScanningCopy() {
		return scanningCopy;
	}

	public void setScanningCopy(String scanningCopy) {
		this.scanningCopy = scanningCopy;
	}

    public double getWagePerHour() {
        return wagePerHour;
    }

    public void setWagePerHour(double wagePerHour) {
        this.wagePerHour = wagePerHour;
    }
}
