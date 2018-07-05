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
    @ManyToOne(targetEntity = GodownHeader.class)
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
}
