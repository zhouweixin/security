package com.xplusplus.security.domain;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 出库单
 * @Date: Created in 10:21 2018/7/5
 * @Modified By:
 */
@Entity
public class Goout {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 出库单表头人：外键
    @ManyToOne(targetEntity = GodownHeader.class)
    @JoinColumn(name = "goout_header_id", referencedColumnName = "id")
    private GooutHeader gooutHeader;

    // 物品：外键
    @ManyToOne(targetEntity = Material.class)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    // 需要归还: 0不需要; 1需要
    private Integer needReturn = 1;

    // 每个人的数量
    private Integer numPerPeople = 1;

    // 人数
    private Integer numPeople = 0;

    // 总数量 = 人数 * 每个人的数量
    private Integer sum = 0;

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

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Integer getNeedReturn() {
        return needReturn;
    }

    public void setNeedReturn(Integer needReturn) {
        this.needReturn = needReturn;
    }

    public Integer getNumPerPeople() {
        return numPerPeople;
    }

    public void setNumPerPeople(Integer numPerPeople) {
        this.numPerPeople = numPerPeople;
    }

    public Integer getNumPeople() {
        return numPeople;
    }

    public void setNumPeople(Integer numPeople) {
        this.numPeople = numPeople;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }
}
