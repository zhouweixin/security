package com.xplusplus.security.vo;

import com.xplusplus.security.domain.Education;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:52 2018/6/25
 * @Modified By:
 */
public class UserEducationNumberVO {
    private Education education;
    private int num = 0;

    public UserEducationNumberVO(Education education, int num) {
        this.education = education;
        this.num = num;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
