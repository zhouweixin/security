package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 报损单
 * @Date: Created in 10:50 2018/7/5
 * @Modified By:
 */
@Entity
public class LossEntry {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 库存：外键
    @ManyToOne(targetEntity = Stock.class)
    @JoinColumn(name = "stock_id", referencedColumnName = "id")
    private Stock stock;

    // 物品：外键
    @ManyToOne(targetEntity = Material.class)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    // 申请人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "apply_user_id", referencedColumnName = "id")
    private User applyUser;

    // 申请时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date applyTime;

    // 库存理论量
    private Integer stockNumber;

    // 报损量
    private Integer lossNumber;

    // 库存实际量（库存理论量-报损量）
    private Integer restNumber;

    // 原因
    private String reason;

    // 审核人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "auditor_id", referencedColumnName = "id")
    private User auditor;

    // 申请时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date auditTime;

    // 审核意见
    private String note;

    // 审核状态：0未审核；1通过；2未通过; 3不需要审核
    private Integer status = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public User getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(User applyUser) {
        this.applyUser = applyUser;
    }

    public Date getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Date applyTime) {
        this.applyTime = applyTime;
    }

    public Integer getStockNumber() {
        return stockNumber;
    }

    public void setStockNumber(Integer stockNumber) {
        this.stockNumber = stockNumber;
    }

    public Integer getLossNumber() {
        return lossNumber;
    }

    public void setLossNumber(Integer lossNumber) {
        this.lossNumber = lossNumber;
    }

    public Integer getRestNumber() {
        return restNumber;
    }

    public void setRestNumber(Integer restNumber) {
        this.restNumber = restNumber;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getAuditor() {
        return auditor;
    }

    public void setAuditor(User auditor) {
        this.auditor = auditor;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }
}
