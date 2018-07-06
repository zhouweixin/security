package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 归还单表头
 * @Date: Created in 10:39 2018/7/5
 * @Modified By:
 */
@Entity
public class ReturnEntryHeader {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 归还时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date returnTime;

    // 归还人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "return_user_id", referencedColumnName = "id")
    private User returnUser;

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

    public Date getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Date returnTime) {
        this.returnTime = returnTime;
    }

    public User getReturnUser() {
        return returnUser;
    }

    public void setReturnUser(User returnUser) {
        this.returnUser = returnUser;
    }

    public User getOperator() {
        return operator;
    }

    public void setOperator(User operator) {
        this.operator = operator;
    }
}
