package com.xplusplus.security.domain;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 采购申请表审核流程
 * @Date: Created in 9:50 2018/7/5
 * @Modified By:
 */
@Entity
public class PurchaseAuditProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "auditor1_id", referencedColumnName = "id")
    private User auditor1;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "auditor2_id", referencedColumnName = "id")
    private User auditor2;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getAuditor1() {
        return auditor1;
    }

    public void setAuditor1(User auditor1) {
        this.auditor1 = auditor1;
    }

    public User getAuditor2() {
        return auditor2;
    }

    public void setAuditor2(User auditor2) {
        this.auditor2 = auditor2;
    }
}
