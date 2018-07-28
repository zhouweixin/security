package com.xplusplus.security.domain;

import javax.persistence.*;
import java.util.Arrays;

/**
 * @Author: zhouweixin
 * @Description: 图片
 * @Date: Created in 18:04 2018/6/6
 * @Modified By:
 */
@Entity
@Table(name = "eqmanage_image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long code;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] data;

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Image{" +
                "code=" + code +
                ", data=" + Arrays.toString(data) +
                '}';
    }
}
