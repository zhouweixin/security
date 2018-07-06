package com.xplusplus.security.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @Author: zhouweixin
 * @Description: 采购申请表审核流程
 * @Date: Created in 9:50 2018/7/5
 * @Modified By:
 */
@Entity
public class PurchaseAuditProcess {
    // 主键:自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 名称
    private String name;

    // 审核人1
    @NotNull(message = "审核人1不可为空")
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "auditor1_id", referencedColumnName = "id")
    private User auditor1;

    // 审核人2
    @NotNull(message = "审核人2不可为空")
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
