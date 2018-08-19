package com.xplusplus.security.vo;

import com.xplusplus.security.domain.Project;

/**
 * @Author: zhouweixin
 * @Description: 项目工作总时长
 * @Date: Created in 15:34 2018/8/19
 * @Modified By:
 */
public class ProjectHoursVO {
    private Project project;
    private Long hours;

    public ProjectHoursVO() {
    }

    public ProjectHoursVO(Project project, Long hours) {
        this.project = project;
        this.hours = hours;
    }

    public Long getHours() {
        return hours;
    }

    public void setHours(Long hours) {
        this.hours = hours;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "ProjectHoursVO{" +
                "project.id=" + project.getId() +
                ", project.name=" + project.getName() +
                ", hours=" + hours +
                '}';
    }
}
