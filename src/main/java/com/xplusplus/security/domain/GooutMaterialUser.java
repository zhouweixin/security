package com.xplusplus.security.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 出库物品与用户关系
 * @Date: Created in 10:33 2018/7/5
 * @Modified By:
 */
@Entity
public class GooutMaterialUser {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 物品：外键
    @ManyToOne(targetEntity = Material.class)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    // 数量
    private Integer number;

    // 员工：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // 出库单表头人：外键
    @ManyToOne(targetEntity = GooutHeader.class)
    @JoinColumn(name = "goout_header_id", referencedColumnName = "id")
    private GooutHeader gooutHeader;

    // 出库时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date gooutTime;

    // 出库经办人: 外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "goout_operator_id", referencedColumnName = "id")
    private User gooutOperator;

    // 归还经办人: 外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "return_operator_id", referencedColumnName = "id")
    private User returnOperator;

    // 归还时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date returnTime;

    // 状态：0未归还；1已归还；2不需要归还
    private Integer status = 0;

    public GooutMaterialUser() {
    }

    public GooutMaterialUser(GooutHeader gooutHeader, User user, Goout goout, User gooutOperator) {
        this.gooutHeader = gooutHeader;
        this.user = user;
        this.material = goout.getMaterial();
        this.number = goout.getNumPerPeople();
        this.status = goout.getNeedReturn() == 1 ? 0 : 2;
        this.gooutTime = new Date();
        this.gooutOperator = gooutOperator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public GooutHeader getGooutHeader() {
        return gooutHeader;
    }

    public void setGooutHeader(GooutHeader gooutHeader) {
        this.gooutHeader = gooutHeader;
    }

    public Date getGooutTime() {
        return gooutTime;
    }

    public void setGooutTime(Date gooutTime) {
        this.gooutTime = gooutTime;
    }

    public User getGooutOperator() {
        return gooutOperator;
    }

    public void setGooutOperator(User gooutOperator) {
        this.gooutOperator = gooutOperator;
    }

    public User getReturnOperator() {
        return returnOperator;
    }

    public void setReturnOperator(User returnOperator) {
        this.returnOperator = returnOperator;
    }

    public Date getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Date returnTime) {
        this.returnTime = returnTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
