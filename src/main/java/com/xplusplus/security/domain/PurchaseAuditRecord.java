package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 采购申请表审核记录
 * @Date: Created in 10:09 2018/7/5
 * @Modified By:
 */
@Entity
public class PurchaseAuditRecord {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 采购单表头人：外键
    @ManyToOne(targetEntity = PurchaseHeader.class)
    @JoinColumn(name = "purchase_header_id", referencedColumnName = "id")
    private PurchaseHeader purchaseHeader;

    // 审核人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "auditor_id", referencedColumnName = "id")
    private User auditor;

    // 审核意见
    private String note;

    // 审核时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date auditTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PurchaseHeader getPurchaseHeader() {
        return purchaseHeader;
    }

    public void setPurchaseHeader(PurchaseHeader purchaseHeader) {
        this.purchaseHeader = purchaseHeader;
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

    public Date getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }
}
