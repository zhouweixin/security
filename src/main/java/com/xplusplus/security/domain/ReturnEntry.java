package com.xplusplus.security.domain;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 归还单
 * @Date: Created in 10:43 2018/7/5
 * @Modified By:
 */
@Entity
public class ReturnEntry {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 入库单表头人：外键
    @ManyToOne(targetEntity = ReturnEntryHeader.class)
    @JoinColumn(name = "return_entry_header_id", referencedColumnName = "id")
    private ReturnEntryHeader returnEntryHeader;

    // 物品：外键
    @ManyToOne(targetEntity = Material.class)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    // 数量
    private Integer number = 1;

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
