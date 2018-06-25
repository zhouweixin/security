package com.xplusplus.security.vo;

import com.xplusplus.security.domain.Project;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 19:48 2018/6/25
 * @Modified By:
 */
public class UserProjectNumberVO {
    private Project project;
    private int num = 0;

    public UserProjectNumberVO(Project project, int num) {
        this.project = project;
        this.num = num;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
