package com.xplusplus.security.domain;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 入库单
 * @Date: Created in 10:13 2018/7/5
 * @Modified By:
 */
@Entity
public class Godown {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 入库单表头人：外键
    @ManyToOne(targetEntity = GodownHeader.class)
    @JoinColumn(name = "godown_header_id", referencedColumnName = "id")
    private GodownHeader godownHeader;

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

    public GodownHeader getGodownHeader() {
        return godownHeader;
    }

    public void setGodownHeader(GodownHeader godownHeader) {
        this.godownHeader = godownHeader;
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
