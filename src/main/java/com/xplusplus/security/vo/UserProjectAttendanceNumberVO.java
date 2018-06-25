package com.xplusplus.security.vo;

import com.xplusplus.security.domain.Project;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 21:08 2018/6/25
 * @Modified By:
 */
public class UserProjectAttendanceNumberVO {
    private Project project;
    private int num;

    public UserProjectAttendanceNumberVO(Project project, int num) {
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
