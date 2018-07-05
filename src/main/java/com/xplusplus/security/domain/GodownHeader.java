package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 入库单表头
 * @Date: Created in 10:13 2018/7/5
 * @Modified By:
 */
@Entity
public class GodownHeader {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 入库时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date godownTime;

    // 采购单表头人：外键
    @ManyToOne(targetEntity = PurchaseHeader.class)
    @JoinColumn(name = "purchase_header_id", referencedColumnName = "id")
    private PurchaseHeader purchaseHeader;

    // 采购申请人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "apply_user_id", referencedColumnName = "id")
    private User applyUser;

    // 经办人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "operator_id", referencedColumnName = "id")
    private User operator;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getGodownTime() {
        return godownTime;
    }

    public void setGodownTime(Date godownTime) {
        this.godownTime = godownTime;
    }

    public PurchaseHeader getPurchaseHeader() {
        return purchaseHeader;
    }

    public void setPurchaseHeader(PurchaseHeader purchaseHeader) {
        this.purchaseHeader = purchaseHeader;
    }

    public User getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(User applyUser) {
        this.applyUser = applyUser;
    }

    public User getOperator() {
        return operator;
    }

    public void setOperator(User operator) {
        this.operator = operator;
    }
}
