package com.xplusplus.security.domain;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 归还物品与用户关系表
 * @Date: Created in 10:46 2018/7/5
 * @Modified By:
 */
public class ReturnMaterialUser {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 归还单表头人：外键
    @ManyToOne(targetEntity = ReturnEntryHeader.class)
    @JoinColumn(name = "return_entry_header_id", referencedColumnName = "id")
    private ReturnEntryHeader returnEntryHeader;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReturnEntryHeader getReturnEntryHeader() {
        return returnEntryHeader;
    }

    public void setReturnEntryHeader(ReturnEntryHeader returnEntryHeader) {
        this.returnEntryHeader = returnEntryHeader;
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
}
