package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description: 采购单表头
 * @Date: Created in 9:47 2018/7/5
 * @Modified By:
 */
@Entity
public class PurchaseHeader {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 采购单
    @OneToMany(targetEntity = Purchase.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "purchase_header_id", referencedColumnName = "id")
    private Set<Purchase> purchases = new HashSet<>();

    // 申请人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "apply_user_id", referencedColumnName = "id")
    private User applyUser;

    // 申请部门：外键
    @ManyToOne(targetEntity = Department.class)
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    // 采购申请表审核流程: 外键
    @ManyToOne(targetEntity = PurchaseAuditProcess.class)
    @JoinColumn(name = "purchase_audit_process_id", referencedColumnName = "id")
    private PurchaseAuditProcess purchaseAuditProcess;

    // 申请时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date applyTime;

    // 原因
    private String reason;

    // 总金额
    @Column(precision = 2)
    private Double price = 0.00;

    // 审核状态：0未审核；1通过未入库；2未通过；3已入库
    private Integer status = 0;

    // 当前审核人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "cur_auditor_id", referencedColumnName = "id")
    private User curAuditor;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(User applyUser) {
        this.applyUser = applyUser;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public PurchaseAuditProcess getPurchaseAuditProcess() {
        return purchaseAuditProcess;
    }

    public void setPurchaseAuditProcess(PurchaseAuditProcess purchaseAuditProcess) {
        this.purchaseAuditProcess = purchaseAuditProcess;
    }

    public Date getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Date applyTime) {
        this.applyTime = applyTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Set<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(Set<Purchase> purchases) {
        this.purchases = purchases;
    }

    public User getCurAuditor() {
        return curAuditor;
    }

    public void setCurAuditor(User curAuditor) {
        this.curAuditor = curAuditor;
    }
}
