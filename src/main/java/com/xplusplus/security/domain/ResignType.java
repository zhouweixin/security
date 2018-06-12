package com.xplusplus.security.domain;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

/**
 * @Author: zhouweixin
 * @Description: 离职类型
 * @Date: Created in 17:18 2018/6/12
 * @Modified By:
 */
@Entity
public class ResignType {
    // 主键
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 名称
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ResignType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
