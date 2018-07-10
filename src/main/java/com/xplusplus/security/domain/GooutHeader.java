package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description: 出库单表头
 * @Date: Created in 10:21 2018/7/5
 * @Modified By:
 */
@Entity
public class GooutHeader {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 出库时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date gooutTime;

    // 出库申请人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "apply_user_id", referencedColumnName = "id")
    private User applyUser;

    // 经办人：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "operator_id", referencedColumnName = "id")
    private User operator;

    // 出库单内容
    @OneToMany(targetEntity = Goout.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "goout_header_id", referencedColumnName = "id")
    private Set<Goout> goouts = new HashSet<>();

    // 人数
    private Integer numPeople = 0;

    // 用户的主键
    @Transient
    private Set<String> userIds = new HashSet<String>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getGooutTime() {
        return gooutTime;
    }

    public void setGooutTime(Date gooutTime) {
        this.gooutTime = gooutTime;
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

    public Set<Goout> getGoouts() {
        return goouts;
    }

    public void setGoouts(Set<Goout> goouts) {
        this.goouts = goouts;
    }

    public Set<String> getUserIds() {
        return userIds;
    }

    public void setUserIds(Set<String> userIds) {
        this.userIds = userIds;
    }

    public Integer getNumPeople() {
        return numPeople;
    }

    public void setNumPeople(Integer numPeople) {
        this.numPeople = numPeople;
    }
}
