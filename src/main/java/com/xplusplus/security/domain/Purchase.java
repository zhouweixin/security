package com.xplusplus.security.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 采购单
 * @Date: Created in 9:47 2018/7/5
 * @Modified By:
 */
@Entity
public class Purchase {
    // 主键：自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 采购单表头人：外键
    @ManyToOne(targetEntity = PurchaseHeader.class)
    @JoinColumn(name = "purchase_header_id", referencedColumnName = "id")
    private PurchaseHeader purchaseHeader;

    // 物品：外键
    @ManyToOne(targetEntity = Material.class)
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    // 单价
    @Column(precision = 2)
    private Double unitPrice = 0.00;

    // 数量
    private Integer number = 0;

    // 合计金额
    @Column(precision = 2)
    private Double price = 0.00;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    public PurchaseHeader getPurchaseHeader() {
        return purchaseHeader;
    }

    public void setPurchaseHeader(PurchaseHeader purchaseHeader) {
        this.purchaseHeader = purchaseHeader;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
