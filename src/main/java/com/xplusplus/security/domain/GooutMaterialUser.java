package com.xplusplus.security.domain;

import javax.persistence.*;

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

    // 出库单表头人：外键
    @ManyToOne(targetEntity = GooutHeader.class)
    @JoinColumn(name = "goout_header_id", referencedColumnName = "id")
    private GooutHeader gooutHeader;

    // 用户：外键
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // 物品：外键
    @ManyToOne(targetEntity = Material.class)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    // 数量
    private Integer number;

    // 状态：0未归还；1已归还；2不需要归还
    private Integer status = 0;

    public GooutMaterialUser() {
    }

    public GooutMaterialUser(GooutHeader gooutHeader, User user, Goout goout) {
        this.gooutHeader = gooutHeader;
        this.user = user;
        this.material = goout.getMaterial();
        this.number = goout.getNumPerPeople();
        this.status = goout.getNeedReturn();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GooutHeader getGooutHeader() {
        return gooutHeader;
    }

    public void setGooutHeader(GooutHeader gooutHeader) {
        this.gooutHeader = gooutHeader;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
